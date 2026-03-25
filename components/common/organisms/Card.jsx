import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
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
  loading
}) {
  const { appColor } = useSelector((state) => state?.productAppTheme);

  return (
    <PageBody style={styles.container(appColor)}>
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[{ color: appColor.text.light }, styles.title]}>
              {title}
            </Text>
            <Icon size={10} color={iconColor} name={"chevron-right"} />{" "}
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "baseline", gap: 6 }}
          >
            <Text style={[{ color: appColor.text.light }, styles.count]}>
              { count!=undefined && count}
            </Text>
            <Text style={{ letterSpacing: -1, color: appColor.text.light }}>
              {subCount && subCount}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            {iconName && <Icon size={10} color={iconColor} name={iconName} />}
            {syncTime ? (
              <Text style={[{ color: appColor.text.light }, styles.subTitle]}>
                Sync {syncTime}
              </Text>
            ) : (
              <Text style={[{ color: subTitleColor }, styles.subTitle]}>
                {subTitle}
              </Text>
            )}
          </View>
        </>
      )}
    </PageBody>
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
  container: (appColor) => ({
    padding: 16,
    gap: 4,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    paddingStart: 20,
    borderWidth: 1,
    borderColor: appColor.grey.border,
  }),
  title: {
    fontSize: 12,
    lineHeight: 16,
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
