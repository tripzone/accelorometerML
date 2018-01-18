import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo';

import { drop as dropDB } from './src/utils/db';
import Button from './src/components/Button';
import { Data } from './src/models/data';
import CurrentMotion from './src/components/CurrentMotion';
import Input from './src/components/WorkoutInput';
import Record from './src/components/RecordButton';

export default class App extends React.Component {
  data = new Data();
  state = {
    gyro: {},
    accel: {},
    count: 0,
    motionType: 'Motion 1',
    isRecording: false,
  };
  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggleSubscription = prediction => {
    if (this.state.isRecording) this._unsubscribe();
    else {
      this.data = new Data();
      this._subscribe(prediction);
    }
  };

  _setUpdateInterval = interval => {
    Accelerometer.setUpdateInterval(interval);
    Gyroscope.setUpdateInterval(interval);
  };

  _requestSlowUpdates = () => this.setUpdateInterval(1000);

  // Request updates every 16ms, which is approximately equal to every frame at 60 frames per second
  _requestFastUpdates = () => this._setUpdateInterval(16);

  _subscribe = prediction => {
    console.info('Subscribed to Accelerometer & Gyroscope updates');
    /** Subscribe to events and update the component state with the new data from the Accelerometer.
     * We save the subscription object away so that we can remove it when the component is unmounted.
     */
    this.setState({ isRecording: true });
    this.data = new Data();
    this.data.setPrediction(prediction);
    this.accelerometerSubscription = Accelerometer.addListener(data => {
      this.data.addAccelData(data);
      this.setState({ accel: data });
      this.setState({ count: this.state.count + 1 });
    });
    this.gyroscopeSubscription = Gyroscope.addListener(data => {
      this.data.addGyroData(data);
      this.setState({ gyro: data });
    });
  };

  _unsubscribe = () => {
    if (this.accelerometerSubscription) this.accelerometerSubscription.remove();
    this.accelerometerSubscription = null;
    if (this.gyroscopeSubscription) this.gyroscopeSubscription.remove();
    this.gyroscopeSubscription = null;
    this.setState({ isRecording: false });
  };

  handleRecordButtonPress = () => {
    if (this.state.isRecording) {
      console.log('isRecording, is saving');
      this.data.save();
    }
    this._toggleSubscription(this.state.motionType);
  };

  render() {
    const { accel, gyro, count, isRecording } = this.state;

    return (
      <View style={styles.container}>
        <Input
          value={this.state.motionType}
          onChange={motionType => this.setState({ motionType })}
        />
        <Record
          style={styles.button}
          isRecording={isRecording}
          onPress={this.handleRecordButtonPress}
        />

        <Button
          title="🔮 Predict"
          onPress={() => this.predictPress()}
          style={styles.button}
        />
        <Button
          title="📖 Train"
          onPress={this.trainPress}
          style={styles.button}
        />
        <Button title="💣 Drop DB" onPress={dropDB} style={styles.button} />
        <CurrentMotion accel={accel} gyro={gyro} count={count} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
