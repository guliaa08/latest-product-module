import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const OSARequests = ({ title, subTitle, time }) => {
  // If only 1 request

  return (
    <View style={styles.banner}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>{title && title}</Text>
        <Text style={styles.subtitle}>{subTitle && subTitle}</Text>
        <Text style={styles.time}>{time && time}</Text>
      </View>

     
      <Pressable onPress={() => onStartScan(request)}>
        <Text style={styles.startScanText}>Start Scan {'>'}</Text>
      </Pressable>
    </View>
  );
};

export default OSARequests;

const styles = StyleSheet.create({
  banner: {
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#2D64B8',
    margin: 10,
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
