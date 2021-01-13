import Axios from 'axios';
import React from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';

//local import
import styles from './styles';

const AddAllergens = ({ navigation }) => {
  const [allergens, setAllergens] = React.useState([]);
  const [checked, setChecked] = React.useState([]);

  React.useEffect(() => {
    getAllergens();
  }, []);

  const getAllergens = async () => {
    const response = await Axios.get('https://allergio-beta.herokuapp.com/api/allergens/');
    setAllergens(response.data.allergens);
  };

  const checkedValue = name => {
    const newChecked = [...checked];
    //console.log(e)
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
    //console.log('allergensSelect',allergensSelect)
    navigation.navigate('AddProfileScreen', { allergensSelect });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.allergensContainer}>
          {allergens.map(allergen => (
            <View key={allergen._id} style={styles.allergen}>
              <Image source={{ uri: allergen.image }} style={styles.image} />
              <Text>{allergen.name}</Text>
              <RadioButton
                value={allergen.name}
                status={checked.includes(allergen.name) ? 'checked' : 'unchecked '}
                onPress={() => checkedValue(allergen.name)}
                disabled={false}
                uncheckedColor="red"
                color="blue"
              />
            </View>
          ))}
          <View style={styles.allergen}>
            <TouchableOpacity style={styles.addAllergen} onPress={navigateTo}>
              <Text style={{ color: 'white' }}>add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddAllergens;
