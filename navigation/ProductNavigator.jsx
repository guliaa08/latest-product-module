// // navigation/ProductNavigator.tsx
// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import ProductList from "../screens/ProductList";
// import ProductDetail from "../screens/ProductDetails";
// import OsaRequests from "../screens/OsaRequests";
// import ProductsScan from "../screens/ProductsScan";
// import ProductsPerCategory from "../screens/ProductsPerCategory";
// import AllOsaRequests from "../screens/AllOsaRequests";
// import Scanner from "../screens/Scanner";

// const Stack = createNativeStackNavigator();

// const ProductNavigator = ({ authKey = "" }) => {
//   return (
//     <Stack.Navigator initialRouteName="ProductList">
//       <Stack.Screen name="ProductList" options={{ title: "Products" }}>
//         {(props) => <ProductList {...props} authToken={authKey} />}
//       </Stack.Screen>
//       <Stack.Screen name="ProductDetail" options={{ title: "Product Details" }}>
//         {(props) => <ProductDetail {...props} authToken={authKey} />}
//       </Stack.Screen>
//       <Stack.Screen name="OsaRequests" options={{ title: "OSA Requests" }}>
//         {(props) => <AllOsaRequests {...props} authToken={authKey} />}
//       </Stack.Screen>
//       <Stack.Screen
//         name="ProductsScan"
//         options={{
//           title: "Products Scan",
//           headerShown: false,
//           headerTransparent: false,
//         }}
//       >
//         {(props) => <ProductsScan {...props} authToken={authKey} />}
//       </Stack.Screen>
//       <Stack.Screen
//         name="ProductsPerCategory"
//         options={{
//           title: "Products Per Category",
//           headerShown: false,
//           headerTransparent: false,
//         }}
//       >
//         {(props) => <ProductsPerCategory {...props} authToken={authKey} />}
//       </Stack.Screen>
//       <Stack.Screen
//         name="Scanner"
//         options={{
//           title: "Aira Lens",
//           headerShown: false,
//           headerTransparent: false,
//         }}
//       >
//         {(props) => <Scanner {...props} authToken={authKey} />}
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

const Stack = createNativeStackNavigator();

const ProductNavigator = ({ authKey = "", isDarkMode = false }) => {
  return (
    <Stack.Navigator initialRouteName="ProductList">
      <Stack.Screen name="ProductList" options={{ title: "Products" }}>
        {(props) => (
          <ProductList {...props} authKey={authKey} isDarkMode={isDarkMode} />
        )}
      </Stack.Screen>

      <Stack.Screen name="ProductDetail" options={{ title: "Product Details" }}>
        {(props) => <ProductDetail {...props} />}
      </Stack.Screen>

      <Stack.Screen name="OsaRequests" options={{ title: "OSA Requests" }}>
        {(props) => <AllOsaRequests {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="ProductsScan"
        options={{
          title: "Products Scan",
          headerShown: false,
        }}
      >
        {(props) => <ProductsScan {...props} />}
      </Stack.Screen>

      <Stack.Screen name="ProductsPerCategory" options={{ headerShown: false }}>
        {(props) => <ProductsPerCategory {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="Scanner"
        options={{
          title: "Aira Lens",
          headerShown: false,
        }}
      >
        {(props) => <Scanner {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProductNavigator;
