import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }, [])


  return (
    <h1>404 Page not found</h1>
  )
}

export default PageNotFound