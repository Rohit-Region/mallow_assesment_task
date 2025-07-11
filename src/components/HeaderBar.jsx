import React from 'react';

const HeaderBar = ({ onLogout, profileOpen, setProfileOpen }) => (
  <div className="users-header">
    <div className="users-header-title">Mallow Technologies Assessment</div>
    <div className="users-header-info">
      Elon Musk
      <div
        className="users-header-avatar"
        onClick={() => setProfileOpen((open) => !open)}
        tabIndex={0}
        onBlur={() => setTimeout(() => setProfileOpen(false), 150)}
      >
        R
        {profileOpen && (
          <div className="users-header-dropdown">
            <button
              className="users-header-logout"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default React.memo(HeaderBar); 