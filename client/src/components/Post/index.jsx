import React, {useState } from 'react'
import Geocode from "react-geocode";

const getLocation = (location) => {
    Geocode.setApiKey(process.env.REACT_APP_API_GOOGLE_API);
    return Geocode.fromLatLng(location.lat, location.lng).then(
    (response) => {
      return response.results[0].formatted_address;
    },
    (error) => {
      console.error(error);
    }
  );
}

const Post = ({post}) => {
    const [address, setAddress] = useState(null)
    const {title, description, tags, author, location, date, imageLink} = post;
    const newDate = new Date(date);
    getLocation(location).then(data => setAddress(data));

  return (
    <div>
        <p>Title: {title}</p>
        {description !== 'undefined' && <p>Description: {description}</p>}
        {tags[0] !== 'undefined' && <p>Tags: {tags}</p>}
        <p>Author: {author}</p>
        <p>Location: {address}</p>
        <p>Date: {newDate.toLocaleString('nl')}</p>
        {imageLink.map(x => {
            if(x.match(/.*\.(gif|jpe?g|bmp|png)$/)) {
                return <img width="100%" key={x} src={x} alt={title}/>
            }
            return (
                    <video key={x} width="100%" controls>
                        <source src={x}/>
                    </video>
                    )
                }
            )
        }
    </div>
  )
}

export default Post