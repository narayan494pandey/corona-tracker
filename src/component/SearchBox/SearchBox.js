import React from 'react'
import './searchbox.css'

const SearchBox =({placeholder,handleChange}) => {
  return (
    <div className="search">
      <input type="search" className="search-input"
      placeholder={placeholder}
      onChange={handleChange} 
      />
      
    </div>
  )
}

export default SearchBox
