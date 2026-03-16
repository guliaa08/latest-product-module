import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authKey: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthKey: (state, action) => {
      state.authKey = action.payload;
    },
    clearAuthKey: (state) => {
      state.authKey = null;
    },
  },
});

export const { setAuthKey, clearAuthKey } = authSlice.actions;
export default authSlice.reducer;