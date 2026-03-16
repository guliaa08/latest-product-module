import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer from "./reducers";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whiteList: ["productAppAuth", "productAppTheme"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);
export { store, persistor };
