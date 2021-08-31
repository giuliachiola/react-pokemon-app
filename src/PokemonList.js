import React from 'react'
import Card from './Card'

export default function PokemonList({pokemonList}) {
  return (
    <div>
      {pokemonList.map(p => (
        <Card pokemon={p}/>
      ))}
    </div>
  )
}
