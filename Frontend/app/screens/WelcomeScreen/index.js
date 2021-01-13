import React, { useContext, useEffect } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Local imports
import AuthContext from '../../context/auth-context';
import styles from './styles';

const WelcomeScreen = props => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let jsonValue;
    try {
      jsonValue = await AsyncStorage.getItem('@storage_Key');
    } catch (e) {
      console.log('ASYNC STORAGE: ', e);
    }
    if (jsonValue) authContext.login(JSON.parse(jsonValue));
  };

  const guestHandler = () => {
    authContext.guest();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/green-logo.png')} style={styles.logo} />
      <Text style={styles.signupLabel}>New to Allergio ?</Text>
      <TouchableHighlight onPress={() => props.navigation.navigate('SignupScreen')} style={styles.signupButton}>
        <Text style={styles.signupText}>Create an account</Text>
      </TouchableHighlight>
      <Text style={styles.loginLabel}>Existing user ?</Text>
      <TouchableHighlight onPress={() => props.navigation.navigate('LoginScreen')} style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableHighlight>
      <Text onPress={guestHandler} style={styles.guest}>
        Continue as guest.
      </Text>
    </View>
  );
};

export default WelcomeScreen;
