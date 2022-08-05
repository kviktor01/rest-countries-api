import React from 'react'

export default function Search({value,onSearch}) {
  return (
    <div className="search-container"><i className="fa-solid fa-magnifying-glass"></i><input value={value} onChange={(e)=>onSearch(e)} placeholder="Search for a country..."/></div>
  )
}
