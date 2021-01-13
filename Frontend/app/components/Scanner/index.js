import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Toast } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';

// Local imports
import Sheet from '../Sheet/index';
import allergenInfo from '../../utils/allergensInfo';
import styles from './styles';

const Scanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const parseAllergens = arr => {
    const result = [];
    for (const item of arr) {
      switch (true) {
        case allergenInfo.WHEAT.includes(item):
          result.push('Wheat');
          break;
        case allergenInfo.MILK.includes(item):
          result.push('Milk');
          break;
        case allergenInfo.SHELLFISH.includes(item):
          result.push('Shellfish');
          break;
        case allergenInfo.EGGS.includes(item):
          result.push('Eggs');
          break;
        case allergenInfo.FISH.includes(item):
          result.push('Fish');
          break;
        case allergenInfo.PEANUT.includes(item):
          result.push('Peanut');
          break;
        case allergenInfo.SOYA.includes(item):
          result.push('Soya');
          break;
        case allergenInfo.NUT.includes(item):
          result.push('Nut');
          break;
        case allergenInfo.SESAME.includes(item):
          result.push('Sesame');
          break;
        default:
          break;
      }
    }
    return result;
  };

  // Permission request
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Fetch data from API
  const handleBarCodeScanned = async ({ data }) => {
    let fetchedData;
    try {
      fetchedData = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
      if (fetchedData) {
        setScanned(true);
        const allergensArr = fetchedData.data.product.allergens.split(',');
        const allergensWord = allergensArr.map(element => (element = element.slice(3)));
        const allergensFinal = parseAllergens(allergensWord);
        setCurrentProduct({
          name: fetchedData.data.product.product_name,
          allergens: allergensFinal,
          img: fetchedData.data.product.image_small_url
        });
        Toast.show({
          text: 'Product scanned!',
          buttonText: 'Okay',
          type: 'success'
        });
      }
    } catch (error) {
      console.log('Fetch failed', error);
      Toast.show({
        text: 'An error occured ...',
        buttonText: 'Okay',
        type: 'danger'
      });
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned ? (
        <Sheet
          {...currentProduct}
          close={() => {
            setScanned(false);
            setCurrentProduct({});
          }}
          open={tag => navigation.navigate('AllergenScreen', { allergenName: tag })}
        />
      ) : (
        <Ionicons style={styles.overlay} name="ios-qr-scanner" size={300} color="rgba(108, 220, 161, 0.4)" />
      )}
    </View>
  );
};

export default Scanner;
