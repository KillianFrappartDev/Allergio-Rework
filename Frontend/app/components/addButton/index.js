import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Local imports
import styles from './style';

const AddButton = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <AntDesign name="plus" size={32} color="white" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddButton;
