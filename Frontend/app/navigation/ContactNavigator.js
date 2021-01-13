import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Local imports
import ContactScreen from '../screens/ContactScreen/index';
import PhoneContactScreen from '../screens/PhoneContactScreen/index';

// Scan Navigation (Stack)
const Stack = createStackNavigator();
const ContactNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="ContactScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ContactScreen" component={ContactScreen} />
        <Stack.Screen
          name="Contacts"
          component={PhoneContactScreen}
          options={{ headerShown: true, headerBackTitle: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ContactNavigator;
