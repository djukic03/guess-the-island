import React from 'react'

const Heart = ({ isLost }) => (
  <div className={`heart2 ${isLost ? 'lost' : ''}`}></div>
);

const Lives = (props) => {
  return (
    <div className='hearts-container'>
      <h2>Lives: </h2>
      {Array(3)
          .fill()
          .map((_, index) => (
            <Heart key={index} isLost={index >= props.lives} />
          ))}
    </div>
  )
}

export default Lives