// navigation/ProductNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from '../screens/ProductList';
import ProductDetail from '../screens/ProductDetails';
import OsaRequests from '../screens/OsaRequests';
import ProductsScan from '../screens/ProductsScan';
import ProductsPerCategory from '../screens/ProductsPerCategory';
import AllOsaRequests from "../screens/AllOsaRequests";
import Scanner from "../screens/Scanner"

const Stack = createNativeStackNavigator();

const ProductNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProductList">
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{ title: 'Products' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ title: 'Product Details' }}
      />
      <Stack.Screen
        name="OsaRequests"
        component={AllOsaRequests}
        options={{ title: 'OSA Requests' }}
      />
      <Stack.Screen
        name="ProductsScan"
        component={ProductsScan}
        options={{
          title: 'Products Scan',
          headerShown: false,
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name="ProductsPerCategory"
        component={ProductsPerCategory}
        options={{
          title: 'Products Per Category',
          headerShown: false,
          headerTransparent: false,
        }}
      />
      <Stack.Screen
        name="Scanner"
        component={Scanner}
        options={{
          title: 'Aira Lens',
          headerShown: false,
          headerTransparent: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductNavigator;
