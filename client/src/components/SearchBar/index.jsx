import React from 'react'

const SearchBar = ({setSearchTerm}) => {

    const onchangeHandler = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
    }
    
  return (
    <input type="text" onChange={onchangeHandler}/>
  )
}

export default SearchBar