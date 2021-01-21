import React, { useContext } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

// Local imports
import Form from '../../components/Form/index.js';
import styles from './styles';
import { API_URL } from '../../utils/data';
import AuthContext from '../../context/auth-context';

const AddProfileScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const authContext = useContext(AuthContext);
  const [user, setUser] = React.useState(authContext.user);
  const [profile, setProfile] = React.useState({});
  const [allergens, setAllergens] = React.useState();

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
      allergens: profile.allergens
    });
    const getUser = await axios.get(API_URL + 'users/' + user._id);
    authContext.setUserprofile(getUser.data.user);
  };

  React.useEffect(() => {
    postProfile();
  }, [profile]);

  React.useEffect(() => {
    route.params && route.params.allergensSelect ? setAllergens(route.params.allergensSelect) : setAllergens([]);
  }, [isFocused]);

  return (
    <View style={styles.editContainer}>
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
