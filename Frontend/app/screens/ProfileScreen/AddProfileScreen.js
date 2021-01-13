import React, { useContext } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
//components import
import Form from '../../components/Form/index.js';

// Local imports
import styles from './styles';
import AuthContext from '../../context/auth-context';

const AddProfileScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const authContext = useContext(AuthContext);
  const [user, setUser] = React.useState(authContext.user);
  const [profile, setProfile] = React.useState({});
  const [allergens, setAllergens] = React.useState();

  // const changeUser = data => {
  //   const newUser = { ...user };

  //   Object.keys(data).map(input => {
  //     newUser[input] = data[input].value;
  //   });
  //   setUser(newUser);
  // };
  //console.log('params',route.params)
  const changeProfile = data => {
    const newProfile = {};

    Object.keys(data).map(input => {
      newProfile[input] = data[input].value;
    });
    //console.log('new',newProfile)
    newProfile.allergens = allergens.map(al => al._id);
    setProfile(newProfile);
  };

  const postProfile = async () => {
    const res = await axios.post('https://allergio-beta.herokuapp.com/api/profiles/', {
      name: profile.name,
      owner: user._id,
      allergens: profile.allergens
    });
    const getUser = await axios.get('https://allergio-beta.herokuapp.com/api/users/' + user._id);
    authContext.setUserprofile(getUser.data.user);
  };

  React.useEffect(() => {
    postProfile();
  }, [profile]);

  React.useEffect(() => {
    //console.log(route.params.allergensSelect)
    route.params && route.params.allergensSelect ? setAllergens(route.params.allergensSelect) : setAllergens([]);
  }, [isFocused]);

  return (
    <View style={styles.editContainer}>
      <Form
        formField={{
          name: {
            label: 'name',
            type: 'text',
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
