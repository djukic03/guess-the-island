import React from 'react'
import { Link } from 'react-router-dom'
import Title from './Title'

const StartBody = () => {

  return (
    <div className='start-body'>
      <Title />
      <div className='start-buttons'>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/map"><button>Play as Guest</button></Link>
      </div>
        
    </div>
  )
}

export default StartBody