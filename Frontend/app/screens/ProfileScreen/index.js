import React, { useContext, useState } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

// Local imports
import CardList from '../../components/CardList/index';
import { API_URL } from '../../utils/data';
import AddButton from '../../components/addButton/index';
import Onboard from '../../components/Onboard/index';
import AuthContext from '../../context/auth-context';
import styles from './styles';

const ProfileScreen = props => {
  const authContext = useContext(AuthContext);
  const [info, setInfo] = useState(true);
  const [user, setUser] = React.useState(authContext.user);
  const [profiles, setProfiles] = React.useState([]);
  const [imageProfile, setImageProfile] = React.useState('https://randomuser.me/api/portraits/men/84.jpg');
  const [sharedProfiles, setSharedProfiles] = React.useState([]);

  React.useEffect(() => {
    setUser(authContext.user);
    getProfiles();
  }, [authContext.user]);

  const getProfiles = async () => {
    let response;
    try {
      response = await axios.get(API_URL + 'profiles/' + authContext.user._id + '/allmight');
    } catch (error) {
      console.log(error);
    }
    setProfiles(response.data.profiles);
    setSharedProfiles(response.data.shared);
  };

  const getUser = async () => {
    console.log('auth', authContext.user);
    setUser(authContext.user);
  };

  // Onboarding
  const closeInfo = () => {
    setInfo(false);
  };

  let boarding;
  if (info) {
    boarding = <Onboard text="Edit your information or create profiles for your children" onClose={closeInfo} left />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.avatar}>
          <AntDesign
            style={{ position: 'absolute', top: 20, left: 20 }}
            onPress={() => authContext.logout()}
            name="logout"
            size={24}
            color="white"
          />
          <Image
            source={{
              uri: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
            }}
            style={styles.image}
          />
          <Text style={styles.text}>{user ? user.name : 'No user'}</Text>
          <View style={styles.edit}>
            <Text onPress={() => props.navigation.navigate('EditScreen')} style={styles.text}>
              Edit
            </Text>
          </View>
        </View>
        <SafeAreaView style={styles.safe}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>My Profiles</Text>
          </View>
          <View style={styles.cards}>
            {profiles.length ? <CardList profilesList={profiles} /> : <Text>No profiles</Text>}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Shared profiles</Text>
          </View>
          <View style={styles.cards}>
            {sharedProfiles.length ? <CardList profilesList={sharedProfiles} /> : <Text>no profiles shared</Text>}
          </View>
        </SafeAreaView>
      </ScrollView>
      <AddButton onPress={() => props.navigation.navigate('AddProfileScreen')} />
      {boarding}
    </View>
  );
};

export default ProfileScreen;
