import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    loading: false,
    error: null,
    //err:null;
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.token = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post('https://reqres.in/api/login', { email, password }, {
      headers: { 'x-api-key': 'reqres-free-v1' },
    });
    dispatch(loginSuccess(response.data.token));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.error || 'Login failed'));
  }
};

export default authSlice.reducer; 