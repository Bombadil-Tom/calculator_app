import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  useEffect( () => {
    const testApi = async () => {
      const res = await axios.post('/calculations');
      console.log(res);
    };
    testApi();
  })
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
