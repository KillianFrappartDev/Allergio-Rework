import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

//components import
import Form from '../../components/Form/index.js';

// Local imports
import styles from './styles';
import AuthContext from '../../context/auth-context';
import { set } from 'react-native-reanimated';
import { API_URL } from '../../utils/data';
import mime from 'mime';
import uploadHandler from '../../utils/uploadImage';

const EditScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = React.useState(authContext.user);
  const [getApi, setGetApi] = React.useState(false);
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);

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

    try {
      await axios.put(API_URL + 'users/image', { user, image: newImage });
    } catch (error) {
      console.log('IMAGE ERROR');
    }
  };

  const changeUser = async data => {
    const newUser = { ...user };

    Object.keys(data).map(input => {
      newUser[input] = data[input].value;
    });

    const setUserP = new Promise((resolve, reject) => {
      resolve(setGetApi(true));
    });
    setUserP.then(value => {
      setUser(newUser);
    });
  };

  const postUser = async () => {
    const res = await axios.put(API_URL + 'users/edit', {
      user
    });

    const userData = resImage ? resImage.data.data : res.data.user;
    authContext.setUserprofile(userData);
  };

  React.useEffect(() => {
    ('start');
    if (getApi) postUser();
  }, [user]);

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
            value: authContext.user ? authContext.user.name : ''
          },
          lastName: {
            label: 'lastname',
            type: 'name',
            inputProps: {
              required: true
            },
            value: authContext.user ? authContext.user.lastName : ''
          }
        }}
        navigation={navigation}
        submitCallback={changeUser}
      />
    </View>
  );
};

export default EditScreen;
