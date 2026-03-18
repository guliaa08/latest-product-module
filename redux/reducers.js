import { combineReducers } from "@reduxjs/toolkit";
import productAppProductSlice from "./product/reducers";
import productAppUserSlice from "./productUser/reducer";
import productAppThemeSlice from "./theme/themeReducer";
import productAppOsaSlice from "./osa/reducers";
import productAppAuthSlice from "./auth/reducer";
const rootReducer = combineReducers({
  productAppProduct: productAppProductSlice,
  productAppUser: productAppUserSlice,
  productAppTheme: productAppThemeSlice,
  productAppOsa: productAppOsaSlice,
  productAppAuth: productAppAuthSlice,
});

export default rootReducer;
