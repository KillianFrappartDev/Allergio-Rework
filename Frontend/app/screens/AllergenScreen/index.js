import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';

// Local imports
import allergensInfo from '../../utils/allergensInfo';
import styles from './styles';

const AllergenScreen = props => {
  const [currentItem, setCurrentItem] = useState({});
  const { allergenName } = props.route.params;

  useEffect(() => {
    fetchAllergenInfo(allergenName);
  }, []);

  const fetchAllergenInfo = async name => {
    let allergenInfo;
    try {
      allergenInfo = await axios.get('https://allergio-beta.herokuapp.com/api/allergens/name/' + name);
    } catch (error) {
      console.log(error);
    }
    setCurrentItem(allergenInfo.data.message);
  };

  // Allergen not found
  if (!currentItem || currentItem === null)
    return (
      <View style={styles.error}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{currentItem.name}</Text>
          <Image style={styles.image} source={{ uri: currentItem.image }} />
          <View style={styles.content}>
            <Text style={styles.subtitle}>Description</Text>
            <Text style={styles.text}>{currentItem.description}</Text>
            <Text style={styles.subtitle}>Allergic reaction</Text>
            <Text style={styles.text}>{currentItem.reaction}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AllergenScreen;
