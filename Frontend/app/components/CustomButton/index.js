import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const CustomButton = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={[styles[props.color], styles.main]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
