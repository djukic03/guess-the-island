import React from 'react'
import { Link } from 'react-router-dom'

const StartBody = () => {

  return (
    <div className='start-body'>
      <h1 className='start-title'>Guess the Island</h1>
      <h2>Your objective is to find the island with the highest average height based on the given map</h2>
      <div className='start-buttons'>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/map"><button>Play as Guest</button></Link>
      </div>
        
    </div>
  )
}

export default StartBody