import React, { useContext } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

// Local imports
import AuthContext from '../../context/auth-context';
import styles from './styles';

const GuestScreen = props => {
  const authContext = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Signup to unlock more features!</Text>
      <TouchableHighlight onPress={() => authContext.logout()} style={styles.signupButton}>
        <Text style={styles.signupText}>Create an account</Text>
      </TouchableHighlight>
    </View>
  );
};

export default GuestScreen;
