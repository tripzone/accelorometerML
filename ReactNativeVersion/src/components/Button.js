import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {} from 'react-native-elements';

export default ({ onPress, title, color }) => (
  <View style={styles.container}>
    <Button onPress={onPress} large title={title} color={color || null} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
