import React from 'react'

export default function Search({searchTerm, setSearchTerm}) {
  return (
    <div className='search'>
        <div>
        <img src='./search.svg' alt='search'/>
        <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type='text' className='text-white text-3xl' placeholder='Search the Movies You want'/>

        </div>
    </div>
  )
}
