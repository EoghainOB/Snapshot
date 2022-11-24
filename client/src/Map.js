import React, { useEffect, useState } from "react";
import './App.css'
import { GoogleMap, InfoWindow, MarkerF } from "@react-google-maps/api";

function Map({ searchTerm, posts, position }) {
    const [activeMarker, setActiveMarker] = useState(null);
    const [map, setMap] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        setMap(map)
    };
    
    useEffect(() => {
        if(searchTerm) {
            const bounds = new window.google.maps.LatLngBounds();
            posts.forEach(({ location }) => bounds.extend(location));
            map.fitBounds(bounds);
        }
    }, [searchTerm, map, posts])

    return (<GoogleMap
            center={position ? position : { lat: 52.341385609030034, lng: 4.823586345871511 }}
            zoom={position ? 9 : 4 && 5 && 6 && 7}
            mapTypeId="terrain"
            position={position}
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: "100%", height: "500px" }}
        >
            {posts.map(({ id, location, title, description, imageLink, date }) => {
                const newDate = new Date(date);
                return (            
                <MarkerF
                    key={id}
                    position={location}
                    onClick={() => handleActiveMarker(id)}
                >
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>
                                <h2 className="map__title" >
                                    
                                    <span>{newDate.toLocaleString('nl')}</span>
                                    {imageLink.map(x => {
                                        if(x.match(/.*\.(gif|jpe?g|bmp|png)$/)) {
                                            return <img key={x} src={x} alt={title}/>
                                        }
                                        return (
                                                <video key={x} width="100%" height="200px" controls>
                                                    <source src={x}/>
                                                </video>)
                                            }
                                        )
                                    }
                                    <p>{title}</p>
                                    <p>{description}</p>
                                    
                                </h2>
                            </div>
                        </InfoWindow>
                    ) : null}
                </MarkerF>)      
            }
            )}
        </GoogleMap>
    );
}

export default Map;
