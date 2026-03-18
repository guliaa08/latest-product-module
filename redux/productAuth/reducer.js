import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authKey: null,
};

const productAppAuthSlice = createSlice({
  name: "productAppAuthSlice",
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

export const { setAuthKey, clearAuthKey } = productAppAuthSlice.actions;
export default productAppAuthSlice.reducer;