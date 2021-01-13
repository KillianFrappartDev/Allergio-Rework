import React, { useContext } from 'react';
import { View, Platform } from 'react-native';
import axios from 'axios';

//components import
import Form from '../../components/Form/index.js';

// Local imports
import styles from './styles';
import AuthContext from '../../context/auth-context';
import { set } from 'react-native-reanimated';
import mime from 'mime';

const EditScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = React.useState(authContext.user);
  const [getApi, setGetApi] = React.useState(false);

  const changeUser = data => {
    const newUser = { ...user };

    Object.keys(data).map(input => {
      newUser[input] = data[input].value;
    });

    const setUserP = new Promise((resolve, reject) => {
      resolve(setGetApi(true));
    });
    setUserP.then(value => {
      setUser(newUser);
    });
  };

  const postUser = async () => {
    const res = await axios.put('http://localhost:5000/api/users/edit', {
      user
    });

    const userData = resImage ? resImage.data.data : res.data.user;
    authContext.setUserprofile(userData);
  };

  React.useEffect(() => {
    console.log('start');
    if (getApi) postUser();
  }, [user]);

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
            value: authContext.user ? authContext.user.name : ''
          },
          lastName: {
            label: 'lastname',
            type: 'name',
            inputProps: {
              required: true
            },
            value: authContext.user ? authContext.user.lastName : ''
          }
        }}
        navigation={navigation}
        submitCallback={changeUser}
      />
    </View>
  );
};

export default EditScreen;
