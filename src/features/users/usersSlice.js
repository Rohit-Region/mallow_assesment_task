import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
    creating: false,
    createError: null,
    deleting: false,
    deleteError: null,
    updating: false,
    updateError: null,
  },
  reducers: {
    fetchUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createUserStart(state) {
      state.creating = true;
      state.createError = null;
    },
    createUserSuccess(state, action) {
      state.creating = false;
      state.list.unshift(action.payload);
    },
    createUserFailure(state, action) {
      state.creating = false;
      state.createError = action.payload;
    },
    deleteUserStart(state) {
      state.deleting = true;
      state.deleteError = null;
    },
    deleteUserSuccess(state, action) {
      state.deleting = false;
      state.list = state.list.filter(user => user.id !== action.payload);
    },
    deleteUserFailure(state, action) {
      state.deleting = false;
      state.deleteError = action.payload;
    },
    updateUserStart(state) {
      state.updating = true;
      state.updateError = null;
    },
    updateUserSuccess(state, action) {
      state.updating = false;
      state.list = state.list.map(user => user.id === action.payload.id ? action.payload : user);
    },
    updateUserFailure(state, action) {
      state.updating = false;
      state.updateError = action.payload;
    },
  },
});

export const {
  fetchUsersStart, fetchUsersSuccess, fetchUsersFailure,
  createUserStart, createUserSuccess, createUserFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  updateUserStart, updateUserSuccess, updateUserFailure
} = usersSlice.actions;

export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersStart());
  try {
    const response = await axios.get('https://reqres.in/api/users?per_page=12', {
      headers: { 'x-api-key': 'reqres-free-v1' },
    });
    dispatch(fetchUsersSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchUsersFailure(error.response?.data?.error || 'Failed to fetch users'));
  }
};

export const createUser = (user) => async (dispatch) => {
  dispatch(createUserStart());
  try {
    const response = await axios.post('https://reqres.in/api/users', user, {
      headers: { 'x-api-key': 'reqres-free-v1' },
    });
    const newUser = { ...user, ...response.data, id: response.data.id || Date.now() };
    dispatch(createUserSuccess(newUser));
  } catch (error) {
    dispatch(createUserFailure(error.response?.data?.error || 'Failed to create user'));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(`https://reqres.in/api/users/${id}`, {
      headers: { 'x-api-key': 'reqres-free-v1' },
    });
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure(error.response?.data?.error || 'Failed to delete user'));
  }
};

export const updateUser = (user) => async (dispatch) => {
  dispatch(updateUserStart());
  try {
    await axios.put(`https://reqres.in/api/users/${user.id}`, user, {
      headers: { 'x-api-key': 'reqres-free-v1' },
    });
    dispatch(updateUserSuccess(user));
  } catch (error) {
    dispatch(updateUserFailure(error.response?.data?.error || 'Failed to update user'));
  }
};

export default usersSlice.reducer; 