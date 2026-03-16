import React from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

export const PageBody = ({
  children,
  scrollable = false,
  style,
  refreshControl,
  ...props
}) => {
   const appColor = useSelector((state) => state?.productAppTheme?.appColor) || {};
  const Container = scrollable ? ScrollView : View;

  return (
    <Container
      style={[
        { flex: 1, backgroundColor: appColor.background, paddingHorizontal: 4 },
        style,
      ]}
      {...(scrollable ? { refreshControl } : {})}
      {...props}
    >
      {children}
    </Container>
  );
};

export const Center = ({ children, style }) => (
  <View style={[{ alignItems: "center", justifyContent: "center" }, style]}>
    {children}
  </View>
);
