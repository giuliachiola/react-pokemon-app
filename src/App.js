import { useState, useEffect } from 'react'
import PokemonList from './PokemonList';
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
      calcelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setPrevPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }, [currentPageUrl])

  if (isLoading) return 'Loading...'

  return (
    <PokemonList pokemon={pokemon}/>
  );
}

export default App;
