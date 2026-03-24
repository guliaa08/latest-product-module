import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const OSARequests = ({
  title,
  subTitle,
  time,
  btnText,
  request,
  backgroundColor,loading
  // navigation,
}) => {
  console.log("backgroiund color", backgroundColor);

  const navigation = useNavigation();
  const { appColor } = useSelector((state) => state?.productAppTheme);
  const handlePress = () => {
    if (btnText !== "View") {
      navigation.navigate("ProductsScan", { request });
    } else {
      navigation.navigate("OsaRequests", { request });
    }
  };
  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          styles.banner,
          {
            backgroundColor: backgroundColor || "transparent",
            borderColor: appColor.grey.border,
          },
        ]}
      >
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            <View style={styles.leftSection}>
              <Text style={styles.title(appColor)}>{title && title}</Text>
              {subTitle && (
                <Text style={styles.subtitle(appColor)}>{subTitle}</Text>
              )}
              <Text style={styles.time}>{time && time}</Text>
            </View>

            <View>
              <Text style={styles.startScanText}>
                {btnText}
                {">"}
              </Text>
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
};

export default OSARequests;

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  leftSection: {
    gap: 4,
  },
  title: (appColor) => [
    {
      fontSize: 14,
      fontWeight: "bold",
      color: appColor.text.dark,
    },
  ],
  subtitle: (appColor) => [
    {
      fontSize: 12,
      color: appColor.text.dark,
    },
  ],
  time: {
    fontSize: 10,
    color: "#808080",
  },
  startScanText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2D64B8",
  },
  arrow: {
    fontSize: 16,
    fontWeight: "bold",
  },
  centerContainer:{
    flex:1,justifyContent:"center",alignItems:"center"
  }
});
