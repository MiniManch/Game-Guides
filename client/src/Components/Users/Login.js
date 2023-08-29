import React, { useState } from 'react';
import { Button, TextField, Link } from '@mui/material';
import axios from 'axios';
import css from './Style/Login.module.css';
import SuccessPopup from '../General/SuccessPopUp'; // Import the SuccessPopup component
import ErrorModal from '../General/ErrorModal';

let desiredTimeoutForMessage = 3000;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend for login
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}user/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        
        // Save token and username to Local Storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
        console.log(localStorage)
        // Show the success popup
        setSuccessPopupOpen(true);

        // Redirect to home page after designated seconds
        setTimeout(() => {
          console.log('heo')
          window.location.href = '/';
        }, desiredTimeoutForMessage);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password');
      setModalOpen(true);
      setUsername('');
      setPassword('');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSuccessPopupClose = () => {
    setSuccessPopupOpen(false);
  };

  return (
    <div className={css.login_page}>
      <h1 className={css.login_title}>Login</h1>
      <form className={css.login_form} onSubmit={handleLogin}>
        <TextField
          className={`${css.form_input}`}
          label="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          className={`${css.form_input}`}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button className={`${css.form_button}`} type="submit">
          Log In
        </Button>
        <Link href="/user/new" className={`${css.signup_link}`}>
          Sign Up
        </Link>
        {error && <p className={`${css.error_message}`}>{error}</p>}
        <ErrorModal open={modalOpen} onClose={handleCloseModal} error={error} />
        <SuccessPopup 
          open={successPopupOpen}
          timeout={desiredTimeoutForMessage}
          onClose={handleSuccessPopupClose}
          message='Logged in Successfully!'
          style={{ vertical: 'top', horizontal: 'center' }} />
      </form>
    </div>
  );
};

export default LoginPage;
