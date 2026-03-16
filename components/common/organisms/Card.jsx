import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { PageBody } from "../Layout";
import Icon from "react-native-vector-icons/dist/EvilIcons";
import { useSelector } from "react-redux";
export default function Card({
  title,
  subTitle,
  count,
  iconSource,
  iconName,
  iconColor,
  syncTime,
  subTitleColor,
  subCount,
}) {
   const appColor = useSelector((state) => state?.theme?.appColor) || {};

  return (
    <PageBody style={styles.container}>
      <Text style={[{ color: appColor.text.light }, styles.title]}>
        {title} <Icon size={16} color={iconColor} name={"chevron-right"} />{" "}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6 }}>
        <Text style={[{ color: appColor.text.light }, styles.count]}>{count}</Text>
        <Text style={{ letterSpacing: -1, color: appColor.text.light }}>
          {subCount && subCount}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        {iconName && <Icon size={10} color={iconColor} name={iconName} />}
        {
          syncTime ? (
            <Text style={[{ color: appColor.text.light }, styles.subTitle]}>
              Sync {syncTime}h ago
            </Text>
          ) : (
            <Text style={[{ color: subTitleColor }, styles.subTitle]}>
              {subTitle}
            </Text>
          ) //sub title and color and icons and icon color
        }
      </View>
    </PageBody>
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
  container: {
    padding: 16,
    gap: 4,
    borderRadius: 12,
    // borderWidth:1,
    justifyContent: "center",
    paddingStart: 20,
    // borderWidth:1,
  },
  title: {
    fontSize: 12,
  },
  count: {
    fontSize: 28,
    fontWeight: "300",
    letterSpacing: -3,
    lineHeight: 32,
  },
  subTitle: {
    fontSize: 10,
  },
});
