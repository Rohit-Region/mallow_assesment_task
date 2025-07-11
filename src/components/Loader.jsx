import React from 'react';

const Loader = React.memo(() => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
    <div style={{
      width: 48,
      height: 48,
      border: '5px solid #e0e0e0',
      borderTop: '5px solid #2196f3',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
));

export default Loader; 