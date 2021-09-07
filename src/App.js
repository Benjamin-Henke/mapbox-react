import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import * as parkData from './data/skateboard-parks.json';
import './index.css';

function App() {
  // viewport - positions the map and creates the size of the map
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: '100vw',
    height: '100vh',
    zoom: 10
  });

  // sets the state of the park a user selects on the map via the image button
  const [selectedPark, setSelectedPark] = useState(null);

  // allows user to use the Esc key to close the popup window on the map
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    }
  }, [])

  return ( 
    <div className="App">
      <ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/benjaminhenke/ckt9yv86s206617lrq7jwlhk1"
        onViewportChange={viewport => {setViewport(viewport)}}
        >
        {parkData.features.map((park) => (
          <Marker key={park.properties.PARK_ID} latitude={park.geometry.coordinates[1]} longitude={park.geometry.coordinates[0]}>
             <button 
              className="marker-btn" 
              onClick={e => {
                e.preventDefault();
                setSelectedPark(park)
              }}>
               <img src="/skateboarding.svg" alt="Skate Park Icon" />
             </button>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup 
            latitude={selectedPark.geometry.coordinates[1]} 
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null)
            }}
            >
            <div>
              <h3>{selectedPark.properties.NAME}</h3>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default App;
