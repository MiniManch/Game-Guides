import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultProfileImage } from '../../utils';

import css from './Style/ProfilePage.module.css';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(true); // New state
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}user/current-user`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setUserProfile(data);
        } else {
          setError('An error occurred while fetching your profile.');
          navigate('/');
        }
      } catch (error) {
        setError('An error occurred while fetching your profile.');
        navigate('/');
      }
    }

    fetchUserProfile();
  }, [navigate]);

  if (error) {
    return <div className={css.error}>{error}</div>;
  }

  if (!userProfile) {
    return <div className={css.loading}>Loading...</div>;
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  return (
    <div className={css.main}>
      <div className={css.profileContainer}>
        <div className={css.profileHeader}>
          <img
            src={process.env.REACT_APP_CLOUDINARY_IMAGE_URL + (userProfile.profileImage || defaultProfileImage)}
            alt={userProfile.username || 'User'}
            className={css.profileImage}
          />
          <button className={css.changeButton}>Change</button>
        </div>

        {showConfirmation && !userProfile.confirmedEmail && (
          <div className={css.confirmationRequest}>
            Please confirm your email.
            <button className={css.closeButton} onClick={handleConfirmationClose}>
              ✕
            </button>
          </div>
        )}

        <div className={css.guides}>
          {userProfile.guides.length === 0 ? (
            <p>You have no guides.</p>
          ) : (
            <p>Your guides: {userProfile.guides.join(', ')}</p>
          )}
        </div>

        <button className={css.wishlistButton}>Wishlist</button>
      </div>
    </div>
  );
};

export default ProfilePage;
