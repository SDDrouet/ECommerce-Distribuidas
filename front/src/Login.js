// src/Login.js
import React from 'react';
import axios from 'axios';

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      // Make a request to the backend server to initiate the Google OAuth2 flow
      const response = await axios.get('/auth/google');
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error('Error initiating Google login:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // Make a request to the backend server to initiate the Facebook OAuth2 flow
      const response = await axios.get('/auth/facebook');
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error('Error initiating Facebook login:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to our Social Login App!</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
    </div>
  );
};

export default Login;