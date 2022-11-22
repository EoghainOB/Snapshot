import React, { useState } from "react";
import './App.css'
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

function Map({ post, position }) {
    // const markers = post.map(p => (
    //     {
    //         position: {
    //             lat: 52.3676,
    //             lng: 4.9041,
    //         },
    //         // id: p.partyId,
    //         // name: p.name,
    //         // image: p.image,
    //     }
    // ))
    const markers = [
        {
        id: 1,
        position: {
            lat: position.lat,
            lng: position.lng,
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
        bounds.extend(position)
        // markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    return (
        <GoogleMap
            position={position}
            zoom={-10}
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

export default Map;
