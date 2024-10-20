import React, { useState } from 'react';
import './Register.css';
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from '../redux/userSlice'; // Import the loginUser action

// Helper function to register a user
function register(email, password) {
    let jfile = localStorage.getItem('added-items');
    let data = JSON.parse(jfile) || {}; // Parse localStorage or initialize empty object

    if (email in data) {
        return false; // Return false if registration fails
    } else {
        data[email] = password; // Store email and password in localStorage
        localStorage.setItem('added-items', JSON.stringify(data));
        return true; // Return true if registration succeeds
    }
}

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Initialize Redux dispatch
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle form submission for registration
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if registration was successful
        if (register(email, password)) {
            const signupData = { email, password }; // Define the data to log in user
            dispatch(loginUser(signupData)); // Dispatch the loginUser action to store user in Redux
            navigate('/login'); // Redirect to the homepage
        } else {
            window.alert("User already exists"); // Alert if registration fails
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='container'>
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            onChange={e => setEmail(e.target.value)} 
                            value={email} 
                            required
                        />
                    </div>
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            onChange={e => setPassword(e.target.value)} 
                            value={password} 
                            required
                        />
                    </div>
                </div>

                <div className="submit-container">
                    <button type="submit" className="submit">
                        Register
                    </button>
                    <div className="submit" onClick={() => navigate("/login")}>
                        Already a user? Log in
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;
