import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/userSlice'; // Import logout action
import useWebSocket from 'react-use-websocket'; // Default import

const HomePage = () => {
  const socketUrl = 'wss://echo.websocket.org/';  // Plain WebSocket server
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (readyState === WebSocket.OPEN && message.trim() !== '') {
      sendMessage(message);  // Send plain text
      setMessage('');        // Clear input
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  useEffect(() => {
    if (lastMessage) {
      console.log('Received message:', lastMessage.data);
    }
  }, [lastMessage]);

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Home Page</div>
        <div className="underline"></div>
      </div>

      {/* WebSocket connection status */}
      <div>
        WebSocket status: {readyState === WebSocket.OPEN ? 'Connected' : 'Connecting...'}
      </div>

      {/* Display the last received message */}
      <div>
        Last received message: {lastMessage ? lastMessage.data : 'No messages yet.'}
      </div>

      {/* Message input and send button */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send Message</button>

      {/* Logout button */}
      <div className="submit-container">
        <button className="submit" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default HomePage;
