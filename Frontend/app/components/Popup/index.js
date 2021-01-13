import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

import styles from './styles';

const Popup = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onCancel} style={styles.backdrop}></TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.text}>{props.text}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Button title="Cancel" onPress={props.onCancel} color="red" />
          <Button onPress={props.onConfirm} title="Confirm" color="green" />
        </View>
      </View>
    </View>
  );
};

export default Popup;
