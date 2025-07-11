import React from 'react';

const UserTable = ({ users, onEdit, onDelete, updating, deleting }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
    <thead>
      <tr className="users-table-header">
        <th style={{ padding: 12, textAlign: 'left' }}> </th>
        <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
        <th style={{ padding: 12, textAlign: 'left' }}>First Name</th>
        <th style={{ padding: 12, textAlign: 'left' }}>Last Name</th>
        <th style={{ padding: 12, textAlign: 'left' }}>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
          <td style={{ padding: 12 }}>
            <img src={user.avatar} alt="avatar" width={38} height={38} style={{ borderRadius: '50%', objectFit: 'cover' }} />
          </td>
          <td style={{ padding: 12 }}>
            <a href={`mailto:${user.email}`} style={{ color: '#2196f3', textDecoration: 'none', fontWeight: 500 }}>{user.email}</a>
          </td>
          <td style={{ padding: 12 }}>{user.first_name}</td>
          <td style={{ padding: 12 }}>{user.last_name}</td>
          <td style={{ padding: 12 }}>
            <button className="users-action-btn edit" onClick={() => onEdit(user)} disabled={updating}>
              Edit
            </button>
            <button className="users-action-btn delete" onClick={() => onDelete(user)} disabled={deleting}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default React.memo(UserTable); 