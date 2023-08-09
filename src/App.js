import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './Home';
import Weather from './Weather';

import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Weather" element={<Weather />} />
      </Routes>
    </div>
  )
}

export default App;
