import React from 'react';
import WorkoutCreator from './WorkoutCreator.jsx';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate()
    return (
      <div className="App">
        <h1>Hello world!</h1>
        <button onClick={() => navigate('/Home')}>Home</button>
      </div>
    );
  }

export default App;