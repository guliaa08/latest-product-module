import { createSlice } from "@reduxjs/toolkit";
import { COLOR_SCHEMES } from "../../components/common/color";

const initialState = {
  appColor: COLOR_SCHEMES["light"],
};
const productAppThemeSlice = createSlice({
  name: "productAppThemeSlice",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.appColor = COLOR_SCHEMES[action.payload];
    },
  },
});

export default productAppThemeSlice.reducer;
export const { changeTheme } = productAppThemeSlice.actions;
