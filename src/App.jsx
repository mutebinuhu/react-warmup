import React, { useEffect, useState } from 'react'
import { Search } from './components/Search';
const App = () => {
const [searchTerm, setSearchTerm] = useState('')

const BASE_API_URL = "https://api.themoviedb.org/3/"
const API_KEY = import.meta.env.VITE_TMDB_SECRET
const options = {
  method:'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
useEffect(() => {
  const fetchMovies = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}`, options)
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }
  fetchMovies()
}, [])
  return (
   <main>
     <div className='pattern' />
     <div className='wrapper'>
      <header>
        <img src="./hero.png"/>
          <h1>Find<span className='text-gradient'> Movies</span> You will enjoy without hussle</h1>
      </header>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <p className='text-white'>{searchTerm}</p>
     </div>
   </main>

  )
}

export default App;
