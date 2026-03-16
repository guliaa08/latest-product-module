import { combineReducers } from '@reduxjs/toolkit';
import productSlice from './product/reducers';
import userSlice from './user/reducer';
import themeSlice from './theme/themeReducer';
import osaSlice from "./osa/reducers"
const rootReducer = combineReducers({
  product: productSlice,
  user: userSlice,
  theme: themeSlice,
  osa:osaSlice
});

export default rootReducer;
