import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo';

import { drop as dropDB, trainModel } from './src/utils/db';
import Button from './src/components/Button';
import { Data } from './src/models/data';
import * as dataUtils from './src/utils/dataUtils';
import { createStreamFromPublisher } from './src/utils/stream';
import CurrentMotion from './src/components/CurrentMotion';
import Input from './src/components/WorkoutInput';
import Record from './src/components/RecordButton';
import Predict from './src/components/PredictButton';
import Picker from './src/components/DataTargetPicker';
import { sendData } from './src/utils/network';

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
    target: 'test',
  };
  componentWillUnmount() {
    this._unsubscribe('isRecording');
    this._unsubscribe('isPredicting');
  }

  componentDidMount() {
    this.gyro$ = createStreamFromPublisher(Gyroscope);
    this.accel$ = createStreamFromPublisher(Accelerometer);

    this.accel$.subscribe(data =>
      this.setState({ accel: data, count: this.state.count + 1 })
    );
    this.gyro$.subscribe(data => this.setState({ gyro: data }));
    this.accel$.bufferCount(10).subscribe(data => sendData('accel', data));
    this.gyro$.bufferCount(10).subscribe(data => sendData('gyro', data));
  }

  _toggleSubscription = field => {
    if (this.state[field]) this._unsubscribe(field);
    else this._subscribe(field);
  };

  _setUpdateInterval = interval => {
    Accelerometer.setUpdateInterval(interval);
    Gyroscope.setUpdateInterval(interval);
  };

  _subscribe = field => {
    this.setState({ [field]: true });
    this.data = new Data();
    this.data.setWorkout(this.state.motionType);
    this.data.setRepCount(this.state.repCount);
    this.accel$.subscribe(data => this.data.addAccelData(data));
    this.gyro$.subscribe(data => this.data.addGyroData(data));
  };

  _unsubscribe = field => {
    if (this.accelerometerSubscription) this.accelerometerSubscription.remove();
    this.accelerometerSubscription = null;
    if (this.gyroscopeSubscription) this.gyroscopeSubscription.remove();
    this.gyroscopeSubscription = null;
    this.setState({ [field]: false });
  };

  handleRecordButtonPress = (cancelPressed = false) => {
    if (!cancelPressed) dataUtils.save(this.data, this.state.target);
    this._toggleSubscription('isRecording');
  };

  handlePredictButtonPress = () => {
    if (this.state.isPredicting)
      dataUtils.saveForPredict(this.data, this.onPredictionChange);
    this._toggleSubscription('isPredicting');
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
        <Button title="💣 Drop DB" onPress={() => dropDB('test')} />
        <Picker
          target={this.state.target}
          setTarget={target => this.setState({ target })}
        />
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
    justifyContent: 'center',
    padding: 5,
  },
  inputBoxes: {
    flexDirection: 'row',
  },
});
