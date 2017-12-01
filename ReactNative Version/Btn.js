import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class Btn extends React.Component {

  render() {

    return (
      <View>
      <Button
        onPress={this.props.onPress}
        style={styles.recordButton}
        large
        icon={{name: 'envira', type: 'font-awesome'}}
        title={this.props.title}/>  
      </View>

    );
  }
}


const styles = StyleSheet.create({
  recordButton: {
    margin:10,
    width: 500,
  }
});


