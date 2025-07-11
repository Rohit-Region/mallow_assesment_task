import React from 'react';
import Modal from '../pages/Users/Modal';
import Loader from '../components/Loader.jsx';

const UserModal = ({ open, onClose, onSubmit, form, onChange, errors, loading, editingUser, formError }) => (
  <Modal open={open} onClose={onClose}>
    <h3 style={{ marginTop: 0, marginBottom: 18 }}>{editingUser ? 'Edit User' : 'Create User'}</h3>
    <form className="users-modal-form" onSubmit={onSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={onChange}
          required
        />
        {errors.first_name && <div className="error">{errors.first_name}</div>}
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={onChange}
          required
        />
        {errors.last_name && <div className="error">{errors.last_name}</div>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Profile Image (URL)</label>
        <input
          type="url"
          name="avatar"
          value={form.avatar}
          onChange={onChange}
          placeholder="Paste URl :"
        />
        {errors.avatar && <div className="error">{errors.avatar}</div>}
      </div>
      {formError && <div className="error">{formError}</div>}
      <button
        type="submit"
        style={{ width: '100%', padding: '10px 0', background: '#2196f3', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 16, cursor: 'pointer' }}
        disabled={loading}
      >
        {loading ? (editingUser ? 'Saving...' : 'Creating...') : (editingUser ? 'Save Changes' : 'Create User')}
      </button>
      {loading && <Loader />}
    </form>
  </Modal>
);

export default React.memo(UserModal); 