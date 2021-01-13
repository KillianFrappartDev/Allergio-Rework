import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Local imports
import styles from './styles';

const ScanButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>scan</Text>
  </TouchableOpacity>
);

export default ScanButton;
