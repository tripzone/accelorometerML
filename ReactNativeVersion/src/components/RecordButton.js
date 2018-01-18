import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default ({ onPress, isRecording }) => (
  <View style={styles.button}>
    <Button
      title={isRecording ? '🛑 Stop Recording' : '📹 Record'}
      onPress={onPress}
      color={isRecording ? 'green' : null}
    />
  </View>
);

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});
