import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import * as parkData from './data/skateboard-parks.json';
import './index.css';

function App() {
  // viewport - positions the map and creates the size of the map
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: '75vw',
    height: '75vh',
    zoom: 10
  });

  const [selectedPark, setSelectedPark] = useState(null);

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
        mapStyle="mapbox://styles/benjaminhenke/ckt8lfsjz0gyo17mmdvvx97rb"
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
