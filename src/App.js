import { useState, useEffect } from 'react'
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios'

/**
 * https://pokeapi.co/api/v2/pokemon RESPONSE:
 *
 * count:1118
 * next:"https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
 * previous:null
 * results: [....]
 */

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [prevPageUrl, setPrevPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    let cancel
    axios.get(currentPageUrl, {
      /**
       * Axios accepts an object of options as second parameter. We have to use `cancelToken` https://github.com/axios/axios#cancellation
       * Every time we do a request, axios assign the `cancel` variable to the new CancelToken
       */
      calcelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setPrevPageUrl(res.data.previous)
      setNextPageUrl(res.data.next)
      setPokemon(res.data.results.map(p => p.name))
    })

    /**
     * If the user calls the `useEffect` multiple times in a row before the `useEffect` is finished, there will be race condition that will override each other.
     * To make sure to cancel every old request every time we make a new request, we have to return a function inside our `useEffect` and this function is called every single time the `useEffect` is called again. In our app, we want to clean the last API request and use just the new one.
     */
    return () => cancel() // cancel our request
  }, [currentPageUrl])

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  if (isLoading) return 'Loading...'

  return (
    <>
      <PokemonList pokemon={pokemon}/>
      <Pagination
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
        goToNextPage={nextPageUrl ? goToNextPage : null}
      />
    </>
  );
}

export default App;
