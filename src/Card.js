import React from 'react'

export default function Card({pokemon}) {
  return (
    <div>
      <div key={pokemon}>{pokemon}</div>
    </div>
  )
}
