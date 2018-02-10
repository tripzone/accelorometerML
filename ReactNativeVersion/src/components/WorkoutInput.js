import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default ({ value = 'Motion 1', onChange, type = 'default' }) => (
  <TextInput
    edittable
    value={value}
    style={styles.textInput}
    onChangeText={onChange}
    keyboardType={type}
    returnKeyType="done"
  />
);

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    width: '50%',
  },
});
