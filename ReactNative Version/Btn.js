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
        title={this.props.title}
        color={this.props.color ? this.props.color : null} />  

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


