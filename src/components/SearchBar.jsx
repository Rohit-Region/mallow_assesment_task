import React from 'react';

const SearchBar = ({ value, onChange }) => (
  <div style={{ position: 'relative', marginRight: 8 }}>
    <input
      type="text"
      placeholder="Search Bar"
      value={value}
      onChange={onChange}
      className="users-search-input"
    />
    <span className="users-search-icon">
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>
    </span>
  </div>
);

export default React.memo(SearchBar); 