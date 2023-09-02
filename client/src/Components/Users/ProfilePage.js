import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultProfileImage } from '../../utils';
import LoadingModal from '../General/LoadingModal';
import EmailConfirmation from '../General/EmailConfirmation';

import css from './Style/ProfilePage.module.css';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
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
  };

  useEffect(() => {
    fetchUserProfile();
  }, [navigate,userProfile]);

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const handleImageChange = async (event) => {
    setIsLoading(true);

    const imageFile = event.target.files[0];
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}user/update-image/${userProfile._id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 200) {
        fetchUserProfile();
      } else {
        setError('An error occurred while updating the image.');
      }
    } catch (error) {
      setError('An error occurred while updating the image.');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className={css.main}>
      <div className={css.profileContainer}>
        <div className={css.profileHeader}>
          {userProfile && (
            <img
              src={process.env.REACT_APP_CLOUDINARY_IMAGE_URL + (userProfile.profileImage || defaultProfileImage)}
              alt={userProfile.username || 'User'}
              className={css.profileImage}
            />
          )}
          <label className={css.changeButton}>
            Change
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        {showConfirmation && userProfile && !userProfile.confirmedEmail && (
          <EmailConfirmation />
          // <div className={css.confirmationRequest}>
          //   Please confirm your email.
          //   <button className={css.closeButton} onClick={handleConfirmationClose}>
          //     ✕
          //   </button>
          // </div>
        )}
        <div className={css.guides}>
          {userProfile && userProfile.guides.length === 0 ? (
            <p>You have no guides.</p>
          ) : (
            <p>Your guides: {userProfile && userProfile.guides.join(', ')}</p>
          )}
        </div>
        <button className={css.wishlistButton}>Wishlist</button>
      </div>
      {isLoading && <LoadingModal />}
    </div>
  );
};

export default ProfilePage;
