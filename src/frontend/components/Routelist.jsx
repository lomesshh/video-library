import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Profile from "../pages/Auth/Profile";
import Signup from "../pages/Auth/Signup";
import Homepage from "../pages/Home/Homepage";

const Routelist = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/profile" exact element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Routelist;
