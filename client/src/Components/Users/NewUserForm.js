import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import ErrorModal from '../General/ErrorModal';
import css from './Style/NewUserForm.module.css';

const NewUserForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // State for controlling modal visibility

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(username)) {
      setError('Invalid email format');
      setModalOpen(true); // Show error modal
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('username', username);
      formData.append('password', password);

      // Send POST request to backend
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}user/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // Clear form fields
        setUsername('');
        setPassword('');
        setImage('');
        setError('');
        setModalOpen(true); // Show success modal
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === 'Username already exists') {
        setError('Username already exists');
        setModalOpen(true); // Show error modal
        setUsername('');
      } else {
        console.error('Error creating user:', error);
        setError('An error occurred while creating the user.');
        setModalOpen(true); // Show error modal
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={css.main}>
      <form className={css['registration-form']} onSubmit={handleSubmit}>
        <TextField
          className={css['form-input']}
          label="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          className={css['form-input']}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className={css['image-input-container']}>
          <label className={css['image-input-label']} htmlFor="profile-image">
            Profile Image
          </label>
          <input
            className={css['form-input']['image-input']}
            type="file"
            id="profile-image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <Button className={css['form-button']} type="submit">
          Create User
        </Button>
        {/* Only open the modal if there's an error */}
        {error && <ErrorModal open={modalOpen} onClose={handleCloseModal} error={error} />}
      </form>
    </div>
  );
};

export default NewUserForm;
