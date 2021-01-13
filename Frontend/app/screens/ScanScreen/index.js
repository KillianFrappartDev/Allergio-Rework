import React, { useState } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Local imports
import ScanButton from '../../components/ScanButton/index';
import Onboard from '../../components/Onboard/index';
import styles from './styles';

const ScanScreen = ({ navigation }) => {
  const [info, setInfo] = useState(true);

  const closeInfo = () => {
    setInfo(false);
  };

  let boarding;
  if (info) {
    boarding = (
      <Onboard
        text="Click on the 'SCAN' button and point your camera towards any food product's barcode to get information about allergens."
        onClose={closeInfo}
      />
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#6CDCA1', '#1EB5B4']} style={styles.gradiant} start={[0.1, 0.1]}>
        <ScanButton onPress={() => navigation.navigate('Scan')} />
        {boarding}
      </LinearGradient>
    </View>
  );
};

export default ScanScreen;
