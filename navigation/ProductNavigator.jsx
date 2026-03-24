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
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../components/common/atoms/AppHeader";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

const ProductNavigator = (props) => {
  const { appColor } = useSelector((state) => state?.productAppTheme);

  const authKey = props.authKey;
  const isDarkMode = props.isDarkMode;

  const dispatch = useDispatch();

  const retryCount = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (authKey) {
      dispatch(setAuthKey(authKey));

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      return;
    }

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        retryCount.current += 1;

        if (retryCount.current >= 5) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [authKey]);

  useEffect(() => {
    dispatch(changeTheme(isDarkMode ? "dark" : "light"));
  }, [isDarkMode]);

  return (
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={{
        header: (props) => {
          const canGoBack = props.navigation.canGoBack();

          return (
            <AppHeader
              hasLeadingButton={canGoBack}
              leadingButtonPress={props.navigation.goBack}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 20,
                    fontWeight: "700",
                    color: appColor.text.dark,
                  }}
                >
                  {props.options.title}
                </Text>
              </View>
            </AppHeader>
          );
        },
      }}
    >
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

      <Stack.Screen name="ProductsPerCategory" options={{  headerShown: true , title:"All OSA Requests" }}>
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
