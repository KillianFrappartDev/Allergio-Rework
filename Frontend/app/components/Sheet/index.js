import React, { useRef, useContext, useEffect, useState } from 'react';
import { Text, View, TouchableHighlight, Image, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';

import AuthContext from '../../context/auth-context';
import BottomSheet from 'reanimated-bottom-sheet';

// Style imports
import styles from './styles';

const Sheet = props => {
  const sheetRef = useRef(null);
  const authContext = useContext(AuthContext);
  const [allergicPeople, setAllergicPeople] = useState([]);
  const [sharedProfiles, setSharedProfiles] = useState([]);
  const [fetchedShared, setFetchedShared] = useState([]);
  const [fetchedProfiles, setFetchedProfiles] = useState([]);

  useEffect(() => {
    if (authContext.isGuest) return;

    fetchProfilesWithAllergens();
  }, []);

  useEffect(() => {
    if (authContext.isGuest) return;

    const concernedProfiles = [];
    for (const profile of fetchedProfiles) {
      for (const allergen of profile.allergens) {
        if (props.allergens.includes(allergen.name)) {
          concernedProfiles.push(profile);
          break;
        }
      }
    }
    setAllergicPeople(concernedProfiles);

    const concernedShared = [];
    for (const profile of fetchedShared) {
      for (const allergen of profile.allergens) {
        if (props.allergens.includes(allergen.name)) {
          concernedShared.push(profile);
          break;
        }
      }
    }
    setSharedProfiles(concernedShared);
  }, [props.allergens, fetchedProfiles, fetchedShared]);

  const fetchProfilesWithAllergens = async () => {
    let profilesWithAllergens;
    try {
      profilesWithAllergens = await axios.get(
        'https://allergio-beta.herokuapp.com/api/profiles/' + authContext.user._id + '/allmight'
      );
    } catch (error) {
      console.log(error);
    }
    setFetchedProfiles(profilesWithAllergens.data.profiles);
    setFetchedShared(profilesWithAllergens.data.shared);
  };

  // Content
  const renderContent = () => {
    // Product not found
    if (!props.name)
      return (
        <View style={styles.content}>
          <Text>Product not found...</Text>
        </View>
      );

    // No allergens
    let hasAllergens = true;
    if (!props.allergens.length) hasAllergens = false;

    // Profiles
    let profiles;
    if (authContext.isGuest) {
      profiles = <View style={styles.section}></View>;
    } else {
      profiles = (
        <View style={styles.section}>
          <Text style={styles.listTitle}>Your profiles:</Text>
          <View style={styles.list}>
            {allergicPeople.map(item => (
              <View key={item._id}>
                <Image
                  style={styles.profileItem}
                  source={{
                    uri:
                      'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                  }}
                />
                <Text style={{ marginBottom: 30 }}>{item.name}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.listTitle}>{sharedProfiles.length ? 'Shared profiles:' : ''}</Text>
          <View style={styles.list}>
            {sharedProfiles.map(item => (
              <View key={item._id}>
                <Image
                  style={styles.profileItem}
                  source={{
                    uri:
                      'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
                  }}
                />
                <Text>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.content}>
        <View style={styles.expand}></View>
        <View style={styles.header}>
          {props.img && (
            <Image
              style={styles.image}
              source={{
                uri: props.img
              }}
            />
          )}
          <Text style={props.img ? styles.title : styles.titleNoImg}>{props.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.listTitle}>
            {hasAllergens ? 'Contain the following allergens:' : 'No allergens found!'}
          </Text>
          <View style={styles.list}>
            {hasAllergens &&
              props.allergens.map(item => (
                <TouchableWithoutFeedback onPress={props.open.bind(null, item)} key={item}>
                  <Text style={styles.listItem}>{item}</Text>
                </TouchableWithoutFeedback>
              ))}
          </View>
        </View>
        {hasAllergens && profiles}
      </View>
    );
  };

  return (
    <React.Fragment>
      <TouchableHighlight onPress={props.close} style={styles.container}>
        <View></View>
      </TouchableHighlight>
      <BottomSheet
        ref={sheetRef}
        snapPoints={['90%', '40%', 0]}
        borderRadius={10}
        renderContent={renderContent}
        initialSnap={1}
        onCloseEnd={props.close}
        enabledContentTapInteraction={false}
      />
    </React.Fragment>
  );
};

export default Sheet;
