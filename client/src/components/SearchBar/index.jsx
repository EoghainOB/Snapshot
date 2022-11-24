import React from 'react'
import './index.css'

const SearchBar = ({setSearchTerm}) => {

    const onchangeHandler = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
    }
    
  return (
    <div className='searchBar-container'>
      <input className='searchBar' type="text" onChange={onchangeHandler} placeholder='Search by location...'/>
    </div>
  )
}

export default SearchBar