import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import Weather from "./Weather";

import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className=" jumbotron min-vh-100 d-flex align-items-center">
      <div class="container ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Weather/:cityName" element={<Weather />} />
          <Route path="/Weather" element={<Weather />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
