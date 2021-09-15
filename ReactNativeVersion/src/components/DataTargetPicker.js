import { Picker } from 'react-native';
import React from 'react';

export default ({ target, setTarget }) => (
  <Picker
    selectedValue={target}
    onValueChange={itemValue => setTarget(itemValue)}
  >
    <Picker.Item label="Test" value="test" />
    <Picker.Item label="Prod" value="prod" />
  </Picker>
);
