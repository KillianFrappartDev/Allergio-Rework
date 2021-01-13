import React from 'react';
import { View, Text, Button } from 'react-native';

import styles from './styles';

const Onboard = props => {
  return (
    <View style={props.left ? styles.containerLeft : styles.container}>
      <Text style={styles.text}>{props.text}</Text>
      <Button onPress={props.onClose} title="Ok got it!" color="green" />
    </View>
  );
};

export default Onboard;
