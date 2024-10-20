// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load user data from localStorage on initialization
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user)); // Store user data in localStorage
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // Remove user data from localStorage
    },
  },
});

// Export actions
export const { loginUser, logoutUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
