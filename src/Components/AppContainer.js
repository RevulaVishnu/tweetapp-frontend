import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";

import Registration from "./Registration";
//import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Navbar from "./Navbar"
import HomePage from "./HomePage";


function AppContainer() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Registration />} />      
        <Route path="/signin" element={<Login />} />      
        <Route path="/home" element={<HomePage />} />      
      </Routes>
    </HashRouter>
  );
}

export default AppContainer;
