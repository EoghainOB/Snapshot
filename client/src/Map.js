import React, { useEffect, useState } from "react";
import "./App.css";
import { GoogleMap, InfoWindow, MarkerF } from "@react-google-maps/api";
import style from "./mapStyle";
import { Link } from "react-router-dom";

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
    setMap(map);
  };

  useEffect(() => {
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i')
      if(searchTerm && posts.map(post => regex.test(post.address)).length) {
      const bounds = new window.google.maps.LatLngBounds();
      posts.forEach(({ location }) => bounds.extend(location));
      map.fitBounds(bounds);
      }
    }
  }, [searchTerm, map, posts]);

  return (
    <GoogleMap
      center={
        position
          ? position
          : { lat: 52.341385609030034, lng: 4.823586345871511 }
      }
      zoom={position ? 9 : 5}
      mapTypeId="terrain"
      position={position}
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "500px" }}
      options={{
        maxZoom:'12',
        styles: style,
      }}
    >
      {posts.map(({ id, location, title, imageLink }) => {
        return (
          <MarkerF
            key={id}
            position={location}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <Link to={`/posts/${id}`}>
                <div className='map__container'>
                  <h2 className="map__title">
                    <p>{title}</p>
                    {imageLink.map((x) => {
                      if (
                        x
                          .replace(/upload\//, "upload/w_200,h_200,c_fill/")
                          .match(/.*\.(gif|jpe?g|bmp|png)$/)
                      ) {
                        return <img style={ {width: "100%", borderRadius: '5px'}} key={x} src={x} alt={title} />;
                      }
                      return (
                        <video style={ {borderRadius: '5px'}} key={x} width="100%" height="200px" controls>
                          <source src={x} />
                        </video>
                      );
                    })}
                  </h2>
                </div>
              </Link>
              </InfoWindow>
            ) : null}
          </MarkerF>
        );
      })}
    </GoogleMap>
  );
}

export default Map;
