import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Card({pokemon}) {
  const [pokemonInfo, setPokemonInfo] = useState({
    name: pokemon.name,
    img: undefined,
    abilities: [],
    moves: [],
  })

  useEffect(() => {
    axios.get(pokemon.url)
      .then(res => {
        setPokemonInfo({
          ...pokemonInfo,
          img: res.data.sprites.front_default,
          abilities: res.data.abilities ? res.data.abilities.map(el => el.ability.name) : [],
          moves: res.data.moves ? res.data.moves.map(el => el.move.name) : [],
        })
      })
  }, [pokemon, pokemonInfo])

  return (
    <div className="card bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 duration-500 transform transition">
      <h4 className="card-title text-2xl font-bold">{pokemonInfo.name}</h4>
      <div className="text-left">
        {/* abilities */}
        {
          pokemonInfo.abilities && pokemonInfo.abilities.length &&
            <p className="card-description mt-2 text-s font-semibold text-gray-600">
            <strong>Abilities</strong>: {pokemonInfo.abilities.join(', ')}
          </p>
        }
        {/* moves */}
        {
          pokemonInfo.moves && pokemonInfo.moves.length &&
          <details className="card-description mt-2 text-s font-semibold text-gray-600">
            <summary><strong>Moves</strong></summary>
            {pokemonInfo.moves.join(', ')}
          </details>
        }
      </div>
      {/* image */}
      <img className="card-img" loading="lazy" src={pokemonInfo.img} alt={pokemonInfo.name}/>
    </div>
  )
}
