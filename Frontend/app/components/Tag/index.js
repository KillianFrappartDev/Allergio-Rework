import React from 'react';
import { View, Text } from 'react-native';

// Local imports
import styles from './style';

const Tag = ({ allergens }) => {
  return (
    <View style={styles.container}>
      {allergens && allergens.length ? (
        allergens.map(allergen => (
          <View key={allergen._id} style={styles.tag}>
            <Text style={styles.text}>{allergen.name}</Text>
          </View>
        ))
      ) : (
        <View>
          <Text style={styles.text}>no allergen</Text>
        </View>
      )}
    </View>
  );
};

export default Tag;
