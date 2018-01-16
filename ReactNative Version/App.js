import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Accelerometer, Gyroscope } from 'expo';

import Btn from './src/components/Button';
import { Data } from './src/models/data';
import CurrentMotion from './src/components/CurrentMotion';

export default class App extends React.Component {
  data = new Data();
  state = { gyro: {}, accel: {}, count: 0 };
  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggleSubscription = prediction => {
    if (this.isRecording) this._unsubscribe();
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
    this.isRecording = true;
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
    this.isRecording = false;
  };

  handleRecordButtonPress = prediction => {
    this._toggleSubscription(prediction);
    if (!this.isRecording) this.data.save();
  };

  // predictPress = () => {
  //   const recording = this.accelerometerSubscription ? true : false;
  //   this._toggle();
  //   if (recording) {
  //     data = {};
  //     data.x = this.accelerationHist;
  //     // fetch(mlUrl+'/predict' , {
  //     //   headers: {
  //     //     'Accept': 'application/json',
  //     //     'Content-Type': 'application/json'
  //     //   },
  //     //   method: 'POST',
  //     //   body: JSON.stringify( data )
  //     // }).then(response=>console.log(response.json()))
  //     //   .catch(y=>console.log('no good db call', y))

  //     axios
  //       .post(mlUrl + '/predict', data)
  //       .then(response => {
  //         result = response.data['result'];
  //         this.setState({
  //           prediction: result
  //         });
  //       })
  //       .catch(error => console.log('NO GOOD', error));
  //   }
  // };

  render() {
    const {
      accel: { x: ax, y: ay, z: az },
      gyro: { x: gx, y: gy, z: gz },
      count
    } = this.state;

    return (
      <View style={styles.container}>
        <CurrentMotion
          ax={ax}
          ay={ay}
          az={az}
          gx={gx}
          gy={gy}
          gz={gz}
          count={count}
        />
        <Btn
          title="Record One"
          onPress={() => this.handleRecordButtonPress(1)}
        />
        <Btn
          title="Record Two"
          onPress={() => this.handleRecordButtonPress(2)}
        />
        <Btn
          title="Record Three"
          onPress={() => this.handleRecordButtonPress(3)}
        />
        <Divider style={{ backgroundColor: 'blue' }} />
        <Btn
          title="Predict"
          onPress={() => this.predictPress()}
          color="#E91E63"
        />
        <Text>prediction : {0}</Text>
        <Btn title="Train" onPress={() => this.trainPress()} />
        <Text>This will Clear DB</Text>
        <Btn title="Delete" onPress={() => this.clearDB()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  recordButton: {
    margin: 10,
    width: 500
  }
});
