import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default ({ value = 'Motion 1', onChange }) => (
  <TextInput
    edittable
    value={value}
    style={styles.textInput}
    onChangeText={onChange}
  />
);

const styles = StyleSheet.create({
  textInput: { height: 40, borderColor: 'gray', borderWidth: 1, width: '100%' },
});
