import { createSlice } from '@reduxjs/toolkit';
import { get_user_verify } from './actions';

const initialState = {
  isLoadingUser: false,
  isValidUser: false,
  loggedInUser: {},
};

const productAppUserSlice = createSlice({
  name: 'productAppUserSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(get_user_verify.pending, state => {
      state.isLoadingUser = true;
    });
    builder.addCase(get_user_verify.fulfilled, (state, action) => {
      state.isLoadingUser = false;
      state.isValidUser = true;
      state.loggedInUser = { ...action.payload, status: 200 };
    });
    builder.addCase(get_user_verify.rejected, state => {
      state.isLoadingUser = false;
      state.isValidUser = false;
      state.loggedInUser = {};
    });
  },
});

export default productAppUserSlice.reducer;
