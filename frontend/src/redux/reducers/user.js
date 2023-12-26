import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
};

const LoadUserRequest = createAction("LoadUserRequest");
const LoadUserSuccess = createAction("LoadUserSuccess");
const LoadUserFailed = createAction("LoadUserFailed");
const clearErrors = createAction("clearErrors");

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LoadUserRequest, (state) => {
      state.loading = true;
    })
    .addCase(LoadUserSuccess, (state, action) => {
      state.loading = false;
      state.authenticated = true;
      state.user = action.payload;
    })
    .addCase(LoadUserFailed, (state, action) => {
      state.loading = false;
      state.authenticated = false;
      state.error = action.payload;
    })
    .addCase(clearErrors, (state) => {
      state.error = null;
    });
});
