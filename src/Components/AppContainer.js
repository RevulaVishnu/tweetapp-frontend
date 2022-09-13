import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";

import Registration from "./Registration";
//import HomePage from "./HomePage";
import LandingPage from "./LandingPage";
import Login from "./Login";
import HomePage from "./HomePage";
import ListAllUsers from "./ListAllUsers";


function AppContainer() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Registration />} />      
        <Route path="/signin" element={<Login />} />      
        <Route path="/home" element={<HomePage />} />      
        <Route path="/allUsers" element={<ListAllUsers />} />      
      </Routes>
    </HashRouter>
  );
}

export default AppContainer;
