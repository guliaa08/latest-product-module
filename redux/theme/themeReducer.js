import { createSlice } from "@reduxjs/toolkit";
import { COLOR_SCHEMES } from "../../components/common/color";

const initialState = {
  appColor: COLOR_SCHEMES["light"],
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      console.log({ action, action });
      state.appColor = COLOR_SCHEMES[action.payload];
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
