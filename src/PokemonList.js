import React from 'react'
import Card from './Card'

export default function PokemonList({pokemonList}) {
  return (
    <div className="cards-grid">
      {pokemonList.map(p => (
        <Card pokemon={p} key={p.url}/>
      ))}
    </div>
  )
}
