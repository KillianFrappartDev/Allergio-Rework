import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';

// Local imports
import Contact from '../../components/Contact/index';
import styles from './styles';

const PhoneContactScreen = props => {
  const [contacts, setContacts] = useState([]);

  // Init
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();

        if (data.length > 0) {
          setContacts(data);
        } else {
          setContacts([]);
        }
      }
    })();
  }, []);

  const inviteHandler = async (id, num) => {
    console.log('ID: ', id);
    console.log('NUM: ', num);
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      console.log('SMS AVAILABLE');
      const { result } = await SMS.sendSMSAsync([num], 'Download Allergio!');
      console.log('RESULT: ', result);
    } else {
      console.log('SMS NOT AVAILABLE');
    }
  };

  // Display
  let contactDisplay;
  if (contacts.length === 0) {
    contactDisplay = (
      <View style={styles.center}>
        <Text> No contacts found ...</Text>
      </View>
    );
  } else {
    contactDisplay = (
      <ScrollView style={{ width: '90%' }}>
        {contacts.map(item => (
          <Contact
            name={item.name}
            image="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
            number={item.phoneNumbers ? item.phoneNumbers[0].number : '000'}
            id={item.id}
            key={item.id}
            phone={true}
            onInvite={inviteHandler}
          />
        ))}
      </ScrollView>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {contactDisplay}
    </View>
  );
};

export default PhoneContactScreen;
