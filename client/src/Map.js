import React, { useState } from "react";
import './App.css'
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

function Map({ posts, position }) {
    // const markers = [
    //     {
    //     id: 1,
    //     position: {
    //         lat: +(position.lat),
    //         lng: +(position.lng),
    //         },
    //     }, 
    // ];
    // const markers = post.map(p => p)

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
        posts.forEach(({ location }) => bounds.extend(location));
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
            {posts.map(({ id, location, title, description, imageUrl: imageLink }) => {
                console.log('marker',location);
                return (            
                <Marker
                    key={id}
                    position={location}
                    onClick={() => handleActiveMarker(id)}
                >
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>
                                <h2 className="map__title" >
                                    <img src={imageLink} alt={title}/>
                                    <p>{title}</p>
                                    <p>{description}</p>
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
