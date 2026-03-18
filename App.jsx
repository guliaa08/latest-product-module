import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import ProductNavigator from "./navigation/ProductNavigator.jsx";

function App(props) {
  const isDarkMode = useColorScheme() === "light";
  console.log(props, "ther props at app");

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar
              barStyle={isDarkMode ? "light-content" : "dark-content"}
            />
            <ProductNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
