import React, { useState } from 'react';
import LoadingModal from './LoadingModal';
import PopupModal from './PopupModal';

import css from './Style/EmailConfirmation.module.css';

const EmailConfirmation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendConfirmationEmail = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}user/send-confirmation-email`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        user:(localStorage.username ? localStorage.username : '')
      });

      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.main}> {/* Apply the CSS class */}
      <p className={css.message}>
        Click the link below to send a confirmation email:
      </p>
      <button className={css.sendButton} onClick={handleSendConfirmationEmail}>
        Send Confirmation Email
      </button>

      {isLoading && <LoadingModal />}
      {isSuccess && (
        <PopupModal onClose={() => setIsSuccess(false)}>
          Confirmation email was sent successfully.
        </PopupModal>
      )}
    </div>
  );
};

export default EmailConfirmation;




