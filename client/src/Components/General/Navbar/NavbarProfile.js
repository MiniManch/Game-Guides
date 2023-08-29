import React, { useState, useEffect } from 'react';
import { defaultProfileImage } from '../../../utils';

const NavbarProfile = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

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
          setUser(data);
        } else if (response.status === 401 || response.status === 500) {
          console.log('auto logout')
          // Token expired or invalid, clear localStorage and log out user
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
   fetchUserProfile(); 
   console.log(user)
   },[])
  
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <img
        src={user ? process.env.REACT_APP_CLOUDINARY_IMAGE_URL + user.profileImage : defaultProfileImage}
        alt={user?.username || 'User'}
        style={{ cursor: 'pointer', borderRadius: '50%', width: '5vw' }}
      />

      {isDropdownOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1,
            border: '1px solid #ccc', // Add border
            borderRadius: '4px', // Add border radius
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <button
                onClick={onLogout}
                style={{
                  padding: '8px 16px',
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarProfile;
