import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default ({ onPress, isRecording }) => (
  <View style={styles.buttonView}>
    {isRecording ? (
      <View style={styles.recordingView}>
        <View style={styles.recordingButtonView}>
          <Button title={'🛑 Save '} onPress={() => onPress(false)} />
        </View>
        <View style={styles.recordingButtonView}>
          <Button title={'✖️ Cancel '} onPress={() => onPress(true)} />
        </View>
      </View>
    ) : (
      <View style={styles.defaultView}>
        <Button
          title={'📹 Record'}
          onPress={onPress}
          color={isRecording ? 'green' : null}
        />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  buttonView: {
    margin: 10,
  },
  recordingView: {
    flexDirection: 'row',
  },
  recordingButtonView: {
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
});
