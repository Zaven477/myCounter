import { useState } from 'react'
import './App.css'

export const Counter = () => {
  const [count, setCount] = useState(0)


  return (
    <div>
      <p>Счётчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить</button>
    </div>
  );
}

