import './App.css';
import React, { useState } from 'react';

function login() {
  
  return (
    <form >
    <div>
    <div className="login">
        <h1 className='login-para'>
          User Registration
        </h1>

    </div>
    <div className="register">
      <div>User Name: <input name="myInput" /></div>

      <div>Password:  <input type="password" name="password" /></div>
      <button type="submit">Login</button>       
    </div>

    
    </div>
    </form>
  );
}

export default login;
