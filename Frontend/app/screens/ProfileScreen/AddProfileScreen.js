import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

// Local imports
import Form from '../../components/Form/index.js';
import styles from './styles';
import { API_URL } from '../../utils/data';
import AuthContext from '../../context/auth-context';
import uploadHandler from '../../utils/uploadImage';

const AddProfileScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const authContext = useContext(AuthContext);
  const [user, setUser] = React.useState(authContext.user);
  const [profile, setProfile] = React.useState({});
  const [allergens, setAllergens] = React.useState();
  const [image, setImage] = React.useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const changeProfile = data => {
    const newProfile = {};

    Object.keys(data).map(input => {
      newProfile[input] = data[input].value;
    });
    newProfile.allergens = allergens.map(al => al._id);
    setProfile(newProfile);
  };

  const postProfile = async () => {
    const res = await axios.post(API_URL + 'profiles/', {
      name: profile.name,
      owner: user._id,
      allergens: profile.allergens,
      image: image
    });
    const getUser = await axios.get(API_URL + 'users/' + user._id);
    authContext.setUserprofile(getUser.data.user);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      setImage(result.uri);
      makeForm(result);
    }
  };

  const makeForm = async res => {
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = res.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const newImage = await uploadHandler({ uri: localUri, name: filename, type });
    setImage(newImage);

    // try {
    //   await axios.put(API_URL + 'users/image', { user, image: newImage });
    // } catch (error) {
    //   console.log('IMAGE ERROR');
    // }
  };

  React.useEffect(() => {
    postProfile();
  }, [profile]);

  React.useEffect(() => {
    route.params && route.params.allergensSelect ? setAllergens(route.params.allergensSelect) : setAllergens([]);
  }, [isFocused]);

  return (
    <View style={styles.editContainer}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{
            uri:
              image ||
              'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
          }}
          style={[styles.image]}
        />
      </TouchableOpacity>
      <Form
        formField={{
          name: {
            label: 'name',
            type: 'name',
            inputProps: {
              required: true
            },
            value: ''
          },
          allergens: {
            label: 'allergens',
            type: 'select',
            inputProps: {
              required: true
            },
            value: allergens
          }
        }}
        navigation={navigation}
        submitCallback={changeProfile}
      />
    </View>
  );
};

export default AddProfileScreen;
