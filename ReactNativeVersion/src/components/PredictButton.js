import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default ({ onPress, isPredicting }) => (
  <View style={styles.button}>
    <Button
      title={isPredicting ? '🛑 Stop Predicting' : '🔮 Predict'}
      onPress={onPress}
      color={isPredicting ? 'green' : null}
    />
  </View>
);

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});
