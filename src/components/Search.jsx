import React from 'react'

<<<<<<< HEAD
export const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
        <div>
            <img src="./search.svg" alt='search'/> 
            <input type="text" 
            placeholder='Search through Thousands of movies' 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>

=======
export default function Search({searchTerm, setSearchTerm}) {
  return (
    <div className='search'>
        <div>
        <img src='./search.svg' alt='search'/>
        <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type='text' className='text-white text-3xl' placeholder='Search the Movies You want'/>

        </div>
>>>>>>> 393ed0eb0fa16614698517767b7abd8a4f17d191
    </div>
  )
}
