import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import UserLogin from './Components/UserLogin/UserLogin';
import HomePage from './Components/HomePage/HomePage';
import Register from './Components/Register/Register';
// import { useWebSocket } from 'react-use-websocket';

function App() {
  const user = useSelector((state) => state.user.user); // Get user from Redux

  return (
    <Routes>
      <Route path="/" element={user ? <HomePage /> : <UserLogin />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  );
}

export default App;
