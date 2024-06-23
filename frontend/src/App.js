import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-loading-skeleton/dist/skeleton.css'
import Home from "./pages/Home";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SingleTweet from "./pages/tweet/SingleTweet";
import Profile from "./pages/profile/Profile";
function App() {
  return (
    <>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/single-tweet/:id" element={<SingleTweet />} />
          <Route path="/user-profile/:id" element={<Profile />} />


        </Routes>
      </Router>
    </>
  );
}

export default App;