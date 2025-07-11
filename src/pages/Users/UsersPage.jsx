import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, deleteUser, updateUser } from '../../features/users/usersSlice';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader.jsx';
import { Pagination } from 'antd';
import 'antd/dist/reset.css';
import './UsersPage.css';
import UserTable from '../../components/UserTable.jsx';
import UserCardList from '../../components/UserCardList.jsx';
import UserModal from '../../components/UserModal.jsx';
import HeaderBar from '../../components/HeaderBar.jsx';
import SearchBar from '../../components/SearchBar.jsx';

const initialForm = { first_name: '', last_name: '', email: '', avatar: '' };
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validateUrl = (url) => {
  try {
    if (!url) return true;
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const UsersPage = () => {
  const dispatch = useDispatch();
  const { list, loading, error, creating, createError, deleting, updating } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const [profileOpen, setProfileOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(fetchUsers());
    }
  }, [dispatch, token, navigate]);

  const filteredUsers = useMemo(() =>
    list.filter(
      (user) =>
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.last_name.toLowerCase().includes(search.toLowerCase())
    ),
    [list, search]
  );

  const paginatedUsers = useMemo(() =>
    filteredUsers.slice((page - 1) * perPage, page * perPage),
    [filteredUsers, page, perPage]
  );

  const handleDelete = useCallback((user) => {
    if (window.confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}?`)) {
      dispatch(deleteUser(user.id));
    }
  }, [dispatch]);

  const handleOpenEditModal = useCallback((user) => {
    setForm({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      avatar: user.avatar || '',
      id: user.id,
    });
    setFormError('');
    setEditingUser(user);
    setModalOpen(true);
  }, []);

  const handleOpenModal = useCallback(() => {
    setForm(initialForm);
    setFormError('');
    setEditingUser(null);
    setModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingUser(null);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (!form.first_name || form.first_name.trim().length < 2) errors.first_name = 'First name is required (min 2 chars).';
    if (!form.last_name || form.last_name.trim().length < 2) errors.last_name = 'Last name is required (min 2 chars).';
    if (!form.email) errors.email = 'Email is required.';
    else if (!validateEmail(form.email)) errors.email = 'Invalid email format.';
    if (form.avatar && !validateUrl(form.avatar)) errors.avatar = 'Profile image must be a valid URL.';
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setFormError('');
    if (editingUser) {
      await dispatch(updateUser({ ...editingUser, ...form }));
    } else {
      await dispatch(createUser(form));
    }
    setModalOpen(false);
    setEditingUser(null);
    setFieldErrors({});
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const tableIcon = (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>
  );
  const cardIcon = (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="7" rx="2"/><rect x="3" y="12" width="18" height="7" rx="2"/></svg>
  );

  return (
    <div className="users-main">
      <HeaderBar onLogout={handleLogout} profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
      <div className="users-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ margin: 0 }}>Users</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
            <button
              onClick={handleOpenModal}
              style={{ padding: '8px 22px', background: '#2196f3', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 16, cursor: 'pointer' }}
            >
              Create User
            </button>
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <button
            onClick={() => setView('list')}
            style={{
              background: view === 'list' ? '#eaf3ff' : 'transparent',
              color: view === 'list' ? '#2196f3' : '#222',
              border: 'none',
              fontWeight: 600,
              fontSize: 16,
              marginRight: 8,
              padding: '6px 12px',
              borderRadius: 5,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {tableIcon} <span style={{ marginLeft: 6 }}>Table</span>
          </button>
          <button
            onClick={() => setView('card')}
            style={{
              background: view === 'card' ? '#eaf3ff' : 'transparent',
              color: view === 'card' ? '#2196f3' : '#222',
              border: 'none',
              fontWeight: 600,
              fontSize: 16,
              padding: '6px 12px',
              borderRadius: 5,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {cardIcon} <span style={{ marginLeft: 6 }}>Card</span>
          </button>
        </div>
        {(loading || deleting || updating) && <Loader />}
        {!loading && !deleting && !updating && (
          view === 'list' ? (
            <UserTable
              users={paginatedUsers}
              onEdit={handleOpenEditModal}
              onDelete={handleDelete}
              updating={updating}
              deleting={deleting}
            />
          ) : (
            <UserCardList
              users={paginatedUsers}
              onEdit={handleOpenEditModal}
              onDelete={handleDelete}
              updating={updating}
              deleting={deleting}
            />
          )
        )}
        <div className="users-pagination">
          <Pagination
            current={page}
            pageSize={perPage}
            total={filteredUsers.length}
            onChange={setPage}
            showSizeChanger={false}
          />
        </div>
      </div>
      <UserModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        form={form}
        onChange={handleFormChange}
        errors={fieldErrors}
        loading={creating || updating}
        editingUser={editingUser}
        formError={formError}
      />
    </div>
  );
};

export default UsersPage; 