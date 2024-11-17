import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const IslandFound = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(0);
    }

  return (
    <div className='popup-window'>
        <h1>Island found!</h1>
        <button onClick={handleClick}>Play again</button>
    </div>
  )
}

export default IslandFound