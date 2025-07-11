import React from 'react';

const modalBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  background: '#fff',
  borderRadius: 10,
  padding: 32,
  minWidth: 340,
  maxWidth: 400,
  boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
  position: 'relative',
};

const closeBtnStyle = {
  position: 'absolute',
  top: 12,
  right: 16,
  background: 'none',
  border: 'none',
  fontSize: 22,
  cursor: 'pointer',
  color: '#888',
};

const Modal = React.memo(({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div style={modalBackdropStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
        <button style={closeBtnStyle} onClick={onClose} aria-label="Close">&times;</button>
        {children}
      </div>
    </div>
  );
});

export default Modal; 