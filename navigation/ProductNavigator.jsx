// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import ProductList from "../screens/ProductList";
// import ProductDetail from "../screens/ProductDetails";
// import ProductsScan from "../screens/ProductsScan";
// import ProductsPerCategory from "../screens/ProductsPerCategory";
// import AllOsaRequests from "../screens/AllOsaRequests";
// import Scanner from "../screens/Scanner";
// import { setAuthKey } from "../redux/productAuth/reducer";
// import { changeTheme } from "../redux/theme/themeReducer";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const Stack = createNativeStackNavigator();

// const ProductNavigator = (props) => {
//   console.log(props, "the props we get at product module");
//   const authKey = props.authKey;
//   const isDarkMode = props.isDarkMode;
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (authKey) {
//       dispatch(setAuthKey(authKey));
//     }
//   }, [authKey]);

//   useEffect(() => {
//     dispatch(changeTheme(isDarkMode ? "dark" : "light"));
//   }, [isDarkMode]);
//   return (
//     <Stack.Navigator initialRouteName="ProductList">
//       <Stack.Screen name="ProductList" options={{ title: "Products" }}>
//         {(props) => <ProductList {...props} />}
//       </Stack.Screen>

//       <Stack.Screen name="ProductDetail" options={{ title: "Product Details" }}>
//         {(props) => <ProductDetail {...props} />}
//       </Stack.Screen>

//       <Stack.Screen name="OsaRequests" options={{ title: "OSA Requests" }}>
//         {(props) => <AllOsaRequests {...props} />}
//       </Stack.Screen>

//       <Stack.Screen
//         name="ProductsScan"
//         options={{
//           title: "Products Scan",
//           headerShown: false,
//         }}
//       >
//         {(props) => <ProductsScan {...props} />}
//       </Stack.Screen>

//       <Stack.Screen name="ProductsPerCategory" options={{ headerShown: false }}>
//         {(props) => <ProductsPerCategory {...props} />}
//       </Stack.Screen>

//       <Stack.Screen
//         name="Scanner"
//         options={{
//           title: "Aira Lens",
//           headerShown: false,
//         }}
//       >
//         {(props) => <Scanner {...props} />}
//       </Stack.Screen>
//     </Stack.Navigator>
//   );
// };

// export default ProductNavigator;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductList from "../screens/ProductList";
import ProductDetail from "../screens/ProductDetails";
import ProductsScan from "../screens/ProductsScan";
import ProductsPerCategory from "../screens/ProductsPerCategory";
import AllOsaRequests from "../screens/AllOsaRequests";
import Scanner from "../screens/Scanner";
import { setAuthKey } from "../redux/productAuth/reducer";
import { changeTheme } from "../redux/theme/themeReducer";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

const ProductNavigator = (props) => {
  console.log(props, "the props we get at product module");

  const authKey = props.authKey;
  const isDarkMode = props.isDarkMode;

  const dispatch = useDispatch();

  // 🔁 retry counter
  const retryCount = useRef(0);
  const intervalRef = useRef(null);

  // ✅ AUTH KEY RETRY LOGIC
  useEffect(() => {
    console.log("AuthKey effect triggered:", authKey);

    // ✅ If authKey exists → dispatch once and stop everything
    if (authKey) {
      console.log("✅ AuthKey received, dispatching and stopping retry");
      dispatch(setAuthKey(authKey));

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      return;
    }

    // ❌ If no authKey → start retry (only once)
    if (!intervalRef.current) {
      console.log("🚀 Starting authKey retry...");

      intervalRef.current = setInterval(() => {
        retryCount.current += 1;

        console.log(
          `🔁 Retry attempt ${retryCount.current} - authKey still missing`
        );

        // Stop after 5 retries
        if (retryCount.current >= 5) {
          console.log("❌ Max retries reached. Stopping retries.");
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, 5000);
    }

    // cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [authKey]);

  // 🎨 THEME LOGIC
  useEffect(() => {
    console.log("🎨 Theme change:", isDarkMode);
    dispatch(changeTheme(isDarkMode ? "dark" : "light"));
  }, [isDarkMode]);

  return (
    <Stack.Navigator initialRouteName="ProductList">
      <Stack.Screen name="ProductList" options={{ title: "Products" }}>
        {(props) => <ProductList {...props} />}
      </Stack.Screen>

      <Stack.Screen name="ProductDetail" options={{ title: "Product Details" }}>
        {(props) => <ProductDetail {...props} />}
      </Stack.Screen>

      <Stack.Screen name="OsaRequests" options={{ title: "OSA Requests" }}>
        {(props) => <AllOsaRequests {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="ProductsScan"
        options={{ title: "Products Scan", headerShown: false }}
      >
        {(props) => <ProductsScan {...props} />}
      </Stack.Screen>

      <Stack.Screen name="ProductsPerCategory" options={{ headerShown: false }}>
        {(props) => <ProductsPerCategory {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="Scanner"
        options={{ title: "Aira Lens", headerShown: false }}
      >
        {(props) => <Scanner {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProductNavigator;