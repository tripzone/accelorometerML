import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo';

import { drop as dropDB, trainModel } from './src/utils/db';
import Button from './src/components/Button';
import { Data } from './src/models/data';
import * as dataUtils from './src/utils/dataUtils';
import CurrentMotion from './src/components/CurrentMotion';
import Input from './src/components/WorkoutInput';
import Record from './src/components/RecordButton';
import Predict from './src/components/PredictButton';

export default class App extends React.Component {
  data = new Data();
  state = {
    gyro: {},
    accel: {},
    count: 0,
    motionType: 'Motion 1',
    repCount: '4',
    isRecording: false,
    isPredicting: false,
    prediction: null,
  };
  componentWillUnmount() {
    this._unsubscribe('isRecording');
    this._unsubscribe('isPredicting');
  }

  _toggleSubscription = (workoutName, field) => {
    if (this.state[field]) this._unsubscribe(field);
    else this._subscribe(workoutName, field);
  };

  _setUpdateInterval = interval => {
    Accelerometer.setUpdateInterval(interval);
    Gyroscope.setUpdateInterval(interval);
  };

  _subscribe = (workoutName, field) => {
    this.setState({ [field]: true });
    this.data = new Data();
    this.data.setWorkout(workoutName);
    this.accelerometerSubscription = Accelerometer.addListener(data => {
      this.data.addAccelData(data);
      this.setState({ accel: data, count: this.state.count + 1 });
    });
    this.gyroscopeSubscription = Gyroscope.addListener(data => {
      this.data.addGyroData(data);
      this.setState({ gyro: data });
    });
  };

  _unsubscribe = field => {
    if (this.accelerometerSubscription) this.accelerometerSubscription.remove();
    this.accelerometerSubscription = null;
    if (this.gyroscopeSubscription) this.gyroscopeSubscription.remove();
    this.gyroscopeSubscription = null;
    this.setState({ [field]: false });
  };

  handleRecordButtonPress = (cancelPressed = false) => {
    if (!cancelPressed) dataUtils.save(this.data);
    this._toggleSubscription(this.state.motionType, 'isRecording');
  };

  handlePredictButtonPress = () => {
    if (this.state.isPredicting)
      dataUtils.saveForPredict(this.data, this.onPredictionChange);
    this._toggleSubscription(this.state.motionType, 'isPredicting');
  };

  onPredictionChange = result => {
    this.setState({ prediction: result });
  };

  render() {
    const {
      accel,
      gyro,
      count,
      isRecording,
      isPredicting,
      repCount,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.inputBoxes}>
          <Input
            value={this.state.motionType}
            onChange={motionType => this.setState({ motionType })}
          />
          <Input
            type={'numeric'}
            value={repCount}
            onChange={repCount => this.setState({ repCount })}
          />
        </View>
        <Record
          style={styles.button}
          isRecording={isRecording}
          onPress={cancelPressed => this.handleRecordButtonPress(cancelPressed)}
        />
        <Predict
          style={styles.button}
          isPredicting={isPredicting}
          onPress={() => this.handlePredictButtonPress('isPredicting')}
        />

        <Button title="📖 Train" onPress={trainModel} />
        <Button title="💣 Drop DB" onPress={dropDB} />
        <CurrentMotion accel={accel} gyro={gyro} count={count} />
        <Text>{this.state.prediction}</Text>
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
  inputBoxes: {
    flexDirection: 'row',
  },
});
