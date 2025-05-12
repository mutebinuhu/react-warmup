import React, { useEffect, useState } from 'react'
import Search from './components/Search';
const App = () => {
const [searchTerm, setSearchTerm] = useState('')
const [error, setError] = useState("")
const [movieList, setMovieList] = useState([])
const [isLoading, setIsLoading] = useState(false)
const API_URL = "https://api.themoviedb.org/3/"
const API_KEY = import.meta.env.VITE_TMDB_READ_TOKEN_KEY
console.log("api_key", API_KEY)
const options = {
  method:'GET',
  headers:{
    accept:'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
useEffect(()=>{

  const fetchMovies = async () =>{
    try {
      setIsLoading(true)
      const api_endpoint = `${API_URL}discover/movie?sort_by=popularity.desc`
      const response = await fetch(api_endpoint, options)
      console.log("ressss", options)
      console.log("response", response)
      if(!response.ok){
        throw new Error("An error has occured")
        setIsLoading(false)
      }
      const data = await response.json();
      setMovieList(data.results || [])
      console.log("data", data)
      setIsLoading(false)

      if(data.Response === 'False'){
        setError(data.error || 'An error has occured after fetching')
        setMovieList([])
        setIsLoading(false)
        return;
      }
    
    } catch (error) {
      setError("An error has occured ", error.message)
      setIsLoading(false)

    }finally{
      setIsLoading(false)

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
                <h1>Favourite <span className='text-gradient'>Movies</span> You will Like</h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <p className='text-3xl text-white'>searc Term: {searchTerm}</p>
            </header>
            <section className='all-movies'>
                <h2>All Movies</h2>
                {error && <p className='text-red-500'>{error}</p>}
                {isLoading ? 
                
                (
                  <p>Loading</p>
                )
                
                : error ? (

<p className='text-red-500'>{error}</p>
                ) :
                
                <ul>
                    {movieList.map((data) =>{

                        return(
                          <li>Test List</li>
                        )
                    })}
                </ul>
                }
            </section>
        </div>
    </main>

  )
}

export default App;
