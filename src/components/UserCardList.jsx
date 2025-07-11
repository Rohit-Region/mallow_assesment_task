import React from 'react';

const UserCardList = ({ users, onEdit, onDelete, updating, deleting }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 16 }}>
    {users.map(user => (
      <div key={user.id} style={{ width: 220, border: '1px solid #eee', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #f0f0f0', textAlign: 'center', background: '#fafbfc' }}>
        <img src={user.avatar} alt="avatar" width={80} height={80} style={{ borderRadius: '50%', marginBottom: 12, objectFit: 'cover' }} />
        <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{user.first_name} {user.last_name}</div>
        <div style={{ color: '#555', fontSize: 14, marginBottom: 8 }}>{user.email}</div>
        <button className="users-action-btn edit" onClick={() => onEdit(user)} disabled={updating}>
          Edit
        </button>
        <button className="users-action-btn delete" onClick={() => onDelete(user)} disabled={deleting}>
          Delete
        </button>
      </div>
    ))}
  </div>
);

export default React.memo(UserCardList); 