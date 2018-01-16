import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

export default ({ onPress, title, color }) => (
  <View>
    <Button
      onPress={onPress}
      style={styles.recordButton}
      large
      title={title}
      color={color || null}
    />
  </View>
);

const styles = StyleSheet.create({
  recordButton: {
    margin: 10,
    width: 500,
  },
});
