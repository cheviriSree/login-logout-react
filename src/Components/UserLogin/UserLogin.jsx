import React, { useState } from 'react';
import './UserLogin.css';
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/userSlice'; // Import your Redux login action

// Helper function for authentication
function authenticate(email, password) {
    let jfile = localStorage.getItem('added-items');
    let data = JSON.parse(jfile) || {};
    
    if (email in data) {
        if (data[email] === password) {
            return true; // Authentication successful
        } else {
            window.alert("Incorrect Password");
            return false; // Wrong password
        }
    } else {
        window.alert("User not found");
        return false; // User doesn't exist
    }
}

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle form submission for login
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const loginData = { email, password };
        
        // Authenticate user with localStorage data
        if (authenticate(email, password)) {
            dispatch(loginUser(loginData)); // Dispatch Redux action to store user in state
            navigate('/'); // Redirect to home page
        } else {
            // Stay on login page in case of failed authentication
            navigate('/login');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='container'>
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    <div className="input">
                        <img src={email_icon} alt="email icon" />
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email Id"
                            required
                        />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="password icon" />
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='Password'
                            required
                        />
                    </div>
                </div>

                <div className="forgot-password">
                    Lost Password? <span>Click here</span>
                </div>

                <div className="submit-container">
                    <div className="submit" onClick={() => navigate("/signup")}>
                        Click to Sign Up
                    </div>
                    <button type="submit" className="submit">
                        Login
                    </button>
                </div>
            </div>
        </form>
    );
};

export default UserLogin;
