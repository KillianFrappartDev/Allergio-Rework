import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

// Local imports
import AuthContext from '../context/auth-context';
import ScanNavigator from './ScanNavigator';
import ProfileNavigator from './ProfileNavigation';
import ContactNavigator from './ContactNavigator';
import GuestScreen from '../screens/GuestScreen/index';

// Main navigation (Bottom Tab)
const Tab = createBottomTabNavigator();
const MainNavigator = () => {
  const authContext = useContext(AuthContext);

  return (
    <Tab.Navigator initialRouteName="Scan" tabBarOptions={tabOptions}>
      <Tab.Screen
        name="Profile"
        component={authContext.isGuest ? GuestScreen : ProfileNavigator}
        options={{
          tabBarIcon: ({ size, color }) => <FontAwesome name="user" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanNavigator}
        options={{
          tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="barcode-scan" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Contact"
        component={authContext.isGuest ? GuestScreen : ContactNavigator}
        options={{
          tabBarIcon: ({ size, color }) => <AntDesign name="contacts" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

// Main navigation options
const tabOptions = {
  activeBackgroundColor: '#6CDCA1',
  inactiveBackgroundColor: '#6CDCA1',
  activeTintColor: '#FFF',
  inactiveTintColor: '#000',
  showLabel: false
};

export default MainNavigator;
