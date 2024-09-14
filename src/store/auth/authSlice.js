import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: "checking",
    user: {},
    errorMessage: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = null;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = null;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    }
  }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;