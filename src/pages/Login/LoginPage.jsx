import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const LoginPage = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [fieldError, setFieldError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (!email) errors.email = 'Email is required.';
    else if (!validateEmail(email)) errors.email = 'Invalid email format.';
    if (!password) errors.password = 'Password is required.';
    setFieldError(errors);
    if (Object.keys(errors).length > 0) return;
    await dispatch(login(email, password));
  };

  React.useEffect(() => {
    if (token) {
      navigate('/users');
    }
  }, [token, navigate]);

  return (
    <div style={{ minHeight: '100vh', background: '#dedede', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form
        onSubmit={handleSubmit}
        style={{ background: '#fff', padding: 36, borderRadius: 12, boxShadow: '0 4px 32px rgba(0,0,0,0.08)', width: 400, minWidth: 320 }}
      >
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#888' }}>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="m22 7-9.5 6.5a2 2 0 0 1-2 0L2 7"/></svg>
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="eve.holt@reqres.in"
            style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #e0e0e0', borderRadius: 6, fontSize: 16, background: '#f7faff' }}
          />
          {fieldError.email && <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{fieldError.email}</div>}
        </div>
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#888' }}>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="16" height="10" x="4" y="11" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></svg>
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1px solid #e0e0e0', borderRadius: 6, fontSize: 16, background: '#f7faff' }}
          />
          {fieldError.password && <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{fieldError.password}</div>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <input
            type="checkbox"
            checked={true}
            readOnly
            id="remember"
            style={{ marginRight: 8, accentColor: '#2196f3', width: 16, height: 16 }}
          />
          <label htmlFor="remember" style={{ fontSize: 15, color: '#222', cursor: 'pointer' }}>Remember me</label>
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '12px 0', background: '#2196f3', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 18, cursor: 'pointer', marginBottom: 8 }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
        {error && <div style={{ color: 'red', marginTop: 12, textAlign: 'center' }}>{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage; 