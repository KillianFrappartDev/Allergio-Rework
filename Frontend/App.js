import React, { useState, useEffect } from 'react';
import { Root } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Local imports
import AuthContext from './app/context/auth-context';
import MainNavigator from './app/navigation/MainNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font
      });
      setIsReady(true);
    };
    loadFont();
  }, []);

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
    } catch (e) {
      console.log('ASYNC STORAGE: ', e);
    }
  };

  const loginHandler = user => {
    setIsLogged(true);
    setUser(user);
    setIsGuest(false);
  };
  const logoutHandler = () => {
    deleteData();
    setIsLogged(false);
    setUser(null);
    setIsGuest(false);
  };

  const guestHandler = () => {
    setIsGuest(true);
    setIsLogged(true);
  };

  const userHandler = user => {
    setUser(user);
  };

  if (!isReady) return <AppLoading />;
  else {
    return (
      <AuthContext.Provider
        value={{
          isLogged,
          isGuest,
          user,
          login: loginHandler,
          logout: logoutHandler,
          setUserprofile: userHandler,
          guest: guestHandler
        }}
      >
        <Root>
          <NavigationContainer>{isLogged ? <MainNavigator /> : <AuthNavigator />}</NavigationContainer>
        </Root>
      </AuthContext.Provider>
    );
  }
}
