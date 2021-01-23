import React from 'react';
import { Text, View, Image } from 'react-native';

// Local imports
import Tag from '../Tag/index';
import styles from './styles';

const Card = ({ name, image, allergens }) => {
  return (
    <View style={styles.ViewContainer}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri:
              image ||
              'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
          }}
        />
        <Text style={styles.text}>{name}</Text>
        <Tag allergens={allergens} />
      </View>
    </View>
  );
};

export default Card;
