import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EndGame = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime === 1) {
              clearInterval(timer);
              navigate('/');
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
    
        return () => clearInterval(timer);
      }, [navigate]);

  return (
    <div className='popup-window'>
        <h1>Game Over</h1>
        <h2>Game will restart in {timeLeft} seconds</h2>
    </div>
  )
}

export default EndGame