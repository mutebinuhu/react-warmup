import React, { use, useEffect, useState } from 'react'
import Search from './components/Search';
import { Spinner } from './components/Spinner';
import { MovieCard } from './components/MovieCard';
import {useDebounce} from "react-use";
import { trendingMoviesList, updateSearch } from '../appwrite';
const App = () => {
const [searchTerm, setSearchTerm] = useState('')
const [error, setError] = useState("")
const [movieList, setMovieList] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [debouncedTerm, setDebouncedTerm] = useState()
const [trendingMovies, setTrendingMovies] = useState([])
const [trendingError, setTrendingError] = useState("")

useDebounce(() => {
  setDebouncedTerm(searchTerm)
}, 1000, [searchTerm])
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

  const fetchMovies = async (query="") =>{
    try {
      setIsLoading(true)
      const api_endpoint = query ? `${API_URL}search/movie?query=${query}` : `${API_URL}discover/movie?sort_by=popularity.desc`
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
    if(query && data.results.length > 0){
        updateSearch(query, data.results[0])
    }

    } catch (error) {
      setError("An error has occured ", error.message)
      setIsLoading(false)

    }finally{
      setIsLoading(false)

    }
  } 
fetchMovies(debouncedTerm)
}, [debouncedTerm])

useEffect(() => {

 const getTrendingMovies = async () => {
  try {
    const movies = await trendingMoviesList()
    console.log("Trending Movies", movies)
    setTrendingMovies(movies.results || [])
  } catch (error) {
    setTrendingError("An error has occured ", error.message)
  }
 }

 getTrendingMovies()
}, [])
const showPosition = (position) => {
  const lat = position.coords.latitude
  const long = position.coords.longitude
  console.log("Latitude: " + lat + "Longitude: " + long)
  document.getElementById('demo').innerHTML = "Latitude: " + lat + "<br>Longitude: " + long;
  console.log("Latitude: " + lat + "Longitude: " + long)
}
const getLocation = () =>{
  try {
    navigator.geolocation.getCurrentPosition(showPosition)
  } catch (error) {
    console.error("Error getting location", error)
  }
}
  return (
    <main>
        <div className='pattern ' />
        <div className='wrapper text-white'>
            <header>
                <img src="./hero.png"/>
                <h1>Favourite <span className='text-gradient'>Movies</span> You will Like</h1>
                <Search searchTerm={encodeURIComponent(searchTerm)} setSearchTerm={setSearchTerm}/>
            </header>
            <section>
                <h2>Trending Movies</h2>
                {trendingError && <p className='text-red-500'>{trendingError}</p>}

            </section>
            <section className='all-movies mt-[40px]'>
                <h2>All Movies</h2>
                {error && <p className='text-red-500'>{error}</p>}
                {isLoading ? 
                
                (
                  <Spinner />
                )
                
                : error ? (

<p className='text-red-500'>{error}</p>
                ) :
                
                <ul>
                    {movieList.map((movie) =>{

                        return(
                          <MovieCard  
                          key={movie.id}
                          movie={movie}
                          />
                        )
                    })}
                </ul>
                }
            </section>
        </div>
        
{/*<!--->*/}
    </main>

  )
}

export default App;
