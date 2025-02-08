import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  token: null,  // Added token to the state
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      // Assuming payload contains both user and token
      state.currentUser = action.payload;  // Store user info
      state.token = action.payload;  // Store token
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.token = null;  // Clear token when signing out
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
