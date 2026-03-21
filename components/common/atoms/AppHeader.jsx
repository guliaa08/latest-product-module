import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
const AppHeader = ({
  leadingButtonPress,
  children,
  leadingButton = "chevron-left",
  hasLeadingButton = true,
  iconFrom = "Feather",
}) => {
  const appColor = useSelector((state) => state?.productAppTheme?.appColor);
  return (
    <View style={styles.container(appColor)}>
      {hasLeadingButton && (
        <Icon
          from={iconFrom}
          name={leadingButton}
          size={24}
          color={appColor.icon}
          onPress={leadingButtonPress}
          style={styles.iconButton}
        />
      )}
      <View style={styles.content(appColor)}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (appColor) => ({
    height: 56,
    backgroundColor: appColor.background,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: appColor.grey.border,
  }),
  iconButton: {
    padding: 8,
  },
  content: (color) => [
    {
      flex: 1,
      justifyContent: "center",
      color: color.text.regular,
    },
  ],
});

export default AppHeader;
