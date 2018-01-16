import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { round } from '../utils/math';

const CurrentMotion = ({ ax, ay, az, gx, gy, gz }) => (
  <View style={styles.container}>
    <View style={styles.motionRow}>
      <Text style={styles.heading}>Gyroscope:</Text>
      <Text style={styles.number}>{round(gx)}</Text>
      <Text style={styles.number}>{round(gy)}</Text>
      <Text style={styles.number}>{round(gz)}</Text>
    </View>
    <View style={styles.motionRow}>
      <Text style={styles.heading}>Accelerometer:</Text>
      <Text style={styles.number}>{round(ax)}</Text>
      <Text style={styles.number}>{round(ay)}</Text>
      <Text style={styles.number}>{round(az)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  motionRow: {
    flexDirection: 'row'
  },
  number: {
    flex: 1,
    flexBasis: 0,
    flexGrow: 1,
    textAlign: 'center'
  },
  heading: {
      fontWeight: 'bold',
      flex: 1,
  }
});

export default CurrentMotion;
