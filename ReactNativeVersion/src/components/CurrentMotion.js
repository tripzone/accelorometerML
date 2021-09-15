import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { round } from '../utils/math';

const CurrentMotion = ({
  accel: { x: ax, y: ay, z: az },
  gyro: { x: gx, y: gy, z: gz },
}) => (
  <View style={styles.container}>
    <Text style={styles.heading}>Gyroscope:</Text>
    <View style={styles.motionRow}>
      <Text style={styles.number}>{round(gx)}</Text>
      <Text style={styles.number}>{round(gy)}</Text>
      <Text style={styles.number}>{round(gz)}</Text>
    </View>
    <Text style={styles.heading}>Accelerometer:</Text>
    <View style={styles.motionRow}>
      <Text style={styles.number}>{round(ax)}</Text>
      <Text style={styles.number}>{round(ay)}</Text>
      <Text style={styles.number}>{round(az)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  motionRow: {
    flexDirection: 'row',
  },
  number: {
    flex: 1,
    flexBasis: 0,
    flexGrow: 1,
    textAlign: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default CurrentMotion;
