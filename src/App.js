import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Play from './components/Play';
import UserProfile from './components/UserProfile';
import JoinLeague from './components/JoinLeague';
import CreateLeague from './components/CreateLeague';
import ShowLeagues from './components/ShowLeagues';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/play" element={<Play />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/joinleague" element={<JoinLeague />} />
        <Route path="/createaleague" element={<CreateLeague />} />
        <Route path="/userleagues" element={<ShowLeagues />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
