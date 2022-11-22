import React, { useState } from "react";
import './App.css'
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

function Map({ post, position }) {
    const markers = [
        {
        id: 1,
        position: {
            lat: +(position.lat),
            lng: +(position.lng),
            },
        }, 
    ];

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        // bounds.extend(position)
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    return (
        <GoogleMap
            position={position}
            zoom={5}
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: "100%", height: "300px" }}
        >
            {markers.map(({ id,position }) => {
                console.log('marker',position);
                return (            
                <Marker
                    key={id}
                    position={position}
                    onClick={() => handleActiveMarker(id)}
                >
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>
                                <h2 className="map__title" >
                                </h2>
                            </div>
                        </InfoWindow>
                    ) : null}
                </Marker>)      
            }
            )}
        </GoogleMap>
    );
}

// function Map() {
//     const center = { lat: 44, lng: -80 };
  
//     return (
//       <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
//         <Marker position={center} />
//       </GoogleMap>
//     );
//   }

export default Map;
