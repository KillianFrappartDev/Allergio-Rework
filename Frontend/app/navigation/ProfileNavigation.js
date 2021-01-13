import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Local imports
import ProfileScreen from '../screens/ProfileScreen/index';
import EditScreen from '../screens/ProfileScreen/edit';
import AddProfileScreen from '../screens/ProfileScreen/AddProfileScreen';
import AddAllergensScreen from '../screens/ProfileScreen/AddAllergens';

// Scan Navigation (Stack)
const Stack = createStackNavigator();
const ProfileNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="ProfileScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
        <Stack.Screen name="AddProfileScreen" component={AddProfileScreen} />
        <Stack.Screen name="AddAllergensScreen" component={AddAllergensScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProfileNavigator;
