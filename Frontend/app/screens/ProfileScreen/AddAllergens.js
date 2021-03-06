import axios from 'axios';
import React from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';

//local import
import { API_URL } from '../../utils/data';
import styles from './styles';

const AddAllergens = ({ navigation }) => {
  const [allergens, setAllergens] = React.useState([]);
  const [checked, setChecked] = React.useState([]);

  React.useEffect(() => {
    getAllergens();
  }, []);

  const getAllergens = async () => {
    const response = await axios.get(API_URL + 'allergens/');
    setAllergens(response.data.allergens);
  };

  const checkedValue = name => {
    const newChecked = [...checked];
    newChecked.includes(name) ? newChecked.splice(newChecked.indexOf(name), 1) : newChecked.push(name);
    setChecked(newChecked);
  };

  const navigateTo = () => {
    const allergensSelect = checked.map(name => {
      const val = {};
      allergens.some(allergen => {
        if (name === allergen.name) {
          val.name = name;
          val._id = allergen._id;
          return;
        }
      });
      return val;
    });
    navigation.navigate('AddProfileScreen', { allergensSelect });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.allergensContainer}>
          {allergens.map(allergen => (
            <View key={allergen._id} style={styles.allergen}>
              <TouchableOpacity onPress={() => checkedValue(allergen.name)}>
                <Image source={{ uri: allergen.image }} style={styles.image} />
              </TouchableOpacity>
              <Text>{allergen.name}</Text>
              <RadioButton
                value={allergen.name}
                status={checked.includes(allergen.name) ? 'checked' : 'unchecked '}
                disabled={false}
                uncheckedColor="red"
                color="blue"
              />
            </View>
          ))}
          <View style={styles.allergen}>
            <TouchableOpacity style={styles.addAllergen} onPress={navigateTo}>
              <Text style={{ color: 'white' }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddAllergens;
