import css from './Style/PopupModal.module.css';

const PopupModal = ({ children, onClose }) => {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <div className={css.content}>
          <p>{children}</p>
          <button className={css.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
