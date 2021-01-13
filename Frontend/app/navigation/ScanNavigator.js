import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Local imports
import ScanScreen from '../screens/ScanScreen/index';
import Scanner from '../components/Scanner/index';
import AllergenScreen from '../screens/AllergenScreen/index';

// Scan Navigation (Stack)
const Stack = createStackNavigator();
const ScanNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="ScanScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="Scan" component={Scanner} />
        <Stack.Screen name="AllergenScreen" component={AllergenScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScanNavigator;
