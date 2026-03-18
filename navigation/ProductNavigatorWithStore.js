import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import ProductNavigator from "./ProductNavigator";

const ProductNavigatorWithStore = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProductNavigator {...props} />
      </PersistGate>
    </Provider>
  );
};

export default ProductNavigatorWithStore;
