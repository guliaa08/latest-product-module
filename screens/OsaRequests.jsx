import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const OSARequests = ({ title, subTitle, time,btnText,request }) => {

  const navigation = useNavigation();
 const handlePress = () => {
  if (btnText !== "View") {
    navigation.navigate("ProductsScan", { request });
  } else {
    navigation.navigate("OsaRequests");
  }
};
  return (
    <View style={styles.banner}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>{title && title}</Text>
        {subTitle && <Text style={styles.subtitle}>{ subTitle}</Text>}
        <Text style={styles.time}>{time && time}</Text>
      </View>

      <Pressable onPress={handlePress}>
        <Text style={styles.startScanText}>{btnText}{'>'}</Text>
      </Pressable>
    </View>
  );
};

export default OSARequests;

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  leftSection: {
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
  },
  time: {
    fontSize: 10,
    color: '#808080',
  },
  startScanText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D64B8',
  },
  arrow: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
