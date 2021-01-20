import React from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Tag from '../Tag/index';
import Constants from 'expo-constants';

// Local imports
import styles from './styles';

const Form = ({ formField, navigation, changeData, transparent, buttonTitle, submitCallback, noBack, security }) => {
  const [fields, setFields] = React.useState(formField);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const newField = { ...fields };
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      newField.image.value = result.uri;
      newField.image.info = result;
      setFields(newField);
    }
  };

  const goAllergens = () => {
    navigation.navigate('AddAllergensScreen');
  };

  const handlePress = () => {
    //console.log('ok')
    const fieldsState = { ...fields };
    submitCallback(fieldsState);
    noBack || navigation.goBack();
  };

  const handleChangeInput = (value, key) => {
    const newState = { ...fields };
    //console.log(newState)
    newState[key].value = value;
    setFields(newState);
  };

  const renderContent = Object.keys(formField).map(key => {
    const imageDefault =
      'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';
    if (formField[key].type === 'image') {
      return (
        <TouchableOpacity key={key} style={styles.inputContainer} onPress={pickImage}>
          <Image source={{ uri: fields[key].value } || { uri: fields[key].value }} style={styles.image} />
        </TouchableOpacity>
      );
    }

    if (formField[key].type === 'select') {
      return (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.text}>{formField[key].label}</Text>
          <View key={key} style={styles.allergensContainer}>
            <Tag allergens={formField[key].value} />
            <TouchableOpacity style={styles.addAllergen} onPress={goAllergens}>
              <Text style={{ color: 'white' }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View key={key} style={styles.inputContainer}>
        <Text style={styles.text}>{formField[key].label}</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={fields[key].value}
          onChangeText={text => handleChangeInput(text, key)}
          textContentType={fields[key].type}
          secureTextEntry={fields[key].security}
        />
      </View>
    );
  });

  return (
    <View style={transparent ? styles.formContentTransparent : styles.formContent}>
      <ScrollView>{renderContent}</ScrollView>
      <TouchableOpacity onPress={handlePress} style={styles.submit}>
        <Text style={{ color: 'white' }}>{buttonTitle ? buttonTitle : 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;
