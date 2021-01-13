import React, { useState, useContext } from 'react';
import { Text, View, TextInput, Button, ImageBackground } from 'react-native';
import { Toast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Local imports
import AuthContext from '../../context/auth-context';
import Form from '../../components/Form/index';
import styles from './styles';

const LoginScreen = props => {
  const authContext = useContext(AuthContext);

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      console.log('ASYNC STORAGE: ', e);
    }
  };

  const submitHandler = async inputs => {
    const email = inputs.email.value.trim().toLowerCase();
    const password = inputs.password.value.trim();

    let response;
    try {
      response = await axios.post('https://allergio-beta.herokuapp.com/api/users/login', { email, password });
    } catch (error) {
      console.log(error);
    }
    if (response.data.access) {
      authContext.login(response.data.user);
      storeData(response.data.user);
    } else {
      Toast.show({
        text: 'Wrong credentials!',
        buttonText: 'Okay',
        type: 'danger'
      });
    }
  };

  return (
    <ImageBackground source={require('../../assets/login-bg.png')} style={{ width: '100%', height: '100%' }}>
      <View style={styles.editContainer}>
        <Form
          formField={{
            email: {
              label: 'Email',
              type: 'emailAddress',
              inputProps: {
                required: true
              },
              value: ''
            },
            password: {
              label: 'Password',
              type: 'password',
              inputProps: {
                required: true
              },
              value: '',
              security: true
            }
          }}
          transparent
          buttonTitle="Login"
          submitCallback={submitHandler}
          noBack
        />
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
