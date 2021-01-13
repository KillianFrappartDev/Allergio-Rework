import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text, Button, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Toast } from 'native-base';
import axios from 'axios';

// Local imports
import Onboard from '../../components/Onboard/index';
import Popup from '../../components/Popup/index';
import AddButton from '../../components/AddButton/index';
import Contact from '../../components/Contact/index';
import AuthContext from '../../context/auth-context';
import styles from './styles';

const ContactScreen = props => {
  const authContext = useContext(AuthContext);
  const [info, setInfo] = useState(true);
  const [popup, setPopup] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [currentContacts, setCurrentContacts] = useState([]);
  const [sharedContacts, setSharedContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentSearch, setCurrentSearch] = useState([]);

  // Init
  useEffect(() => {
    fetchContacts();
  }, []);

  // Update
  useEffect(() => {
    const filteredContacts = contacts.filter(item => item.name.includes(search) || item.lastName.includes(search));
    setCurrentContacts(filteredContacts);
    searchContacts();
  }, [search, contacts]);

  // Search
  const clearSearch = () => {
    setSearch('');
  };

  const updateSearch = e => {
    setSearch(e);
  };

  // Http requests
  const fetchContacts = async () => {
    let response;
    try {
      response = await axios.get('https://allergio-beta.herokuapp.com/api/contacts/' + authContext.user._id);
    } catch (error) {
      console.log(error);
      return;
    }
    setContacts(response.data.contactResponse);
    setSharedContacts(response.data.shared);
  };

  const searchContacts = async () => {
    if (search.trim() !== '') {
      let response;
      try {
        response = await axios.post('https://allergio-beta.herokuapp.com/api/contacts/search/', { search });
      } catch (error) {
        console.log(error);
        return;
      }
      const uniqueSearch = response.data.contactResponse.filter(item => {
        for (const unit of contacts) {
          if (item.id === unit.id) return false;
        }
        return true;
      });
      setCurrentContacts(prev => [...prev, ...uniqueSearch]);
    } else {
      setCurrentSearch([]);
    }
  };

  const addContact = async id => {
    let response;
    try {
      response = await axios.post('https://allergio-beta.herokuapp.com/api/contacts/', {
        userId: authContext.user._id,
        contactId: id
      });
    } catch (error) {
      console.log(error);
      return;
    }
    setContacts(response.data.contactResponse);
    Toast.show({
      text: 'Contact added!',
      buttonText: 'Okay',
      type: 'success'
    });
    setPopup(null);
  };

  const deleteContact = async id => {
    let response;
    try {
      response = await axios({
        url: 'https://allergio-beta.herokuapp.com/api/contacts/',
        method: 'DELETE',
        data: { userId: authContext.user._id, contactId: id }
      });
    } catch (error) {
      console.log(error);
      return;
    }
    setContacts(response.data.contactResponse);
    Toast.show({
      text: 'Contact removed!',
      buttonText: 'Okay',
      type: 'danger'
    });
    setPopup(null);
  };

  const shareProfiles = async id => {
    let response;
    try {
      response = await axios.post('https://allergio-beta.herokuapp.com/api/contacts/share', {
        userId: authContext.user._id,
        contactId: id
      });
    } catch (error) {
      console.log(error);
      return;
    }
    Toast.show({
      text: 'Profiles shared!',
      buttonText: 'Okay',
      type: 'success'
    });
    setSharedContacts(response.data.shared);
    setPopup(null);
  };

  const unshareProfiles = async id => {
    let response;
    try {
      response = await axios({
        url: 'https://allergio-beta.herokuapp.com/api/contacts/unshare',
        method: 'DELETE',
        data: { userId: authContext.user._id, contactId: id }
      });
    } catch (error) {
      console.log(error);
      return;
    }
    Toast.show({
      text: 'Profiles unshared!',
      buttonText: 'Okay',
      type: 'danger'
    });
    setSharedContacts(response.data.shared);
    setPopup(null);
  };

  // Onboarding
  const closeInfo = () => {
    setInfo(false);
  };

  let boarding;
  if (info) {
    boarding = (
      <Onboard
        text="Use the search bar to find contacts or invite your friends with the green button!"
        onClose={closeInfo}
        left
      />
    );
  }

  // Popup
  const createPopup = callback => {
    setPopup(<Popup text="Are you sure" onConfirm={callback} onCancel={() => setPopup(null)} />);
  };

  // Display
  let contactDisplay;
  if (currentContacts.length === 0 && currentSearch.length === 0) {
    contactDisplay = (
      <View style={styles.center}>
        <Text> No contacts found ...</Text>
      </View>
    );
  } else {
    contactDisplay = (
      <ScrollView style={{ width: '90%' }}>
        {currentContacts.map(item => (
          <Contact
            name={item.name + ' ' + item.lastName}
            image={'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'}
            onDelete={createPopup.bind(null, deleteContact.bind(item, item.id))}
            onShare={createPopup.bind(null, shareProfiles.bind(item, item.id))}
            onUnshare={createPopup.bind(null, unshareProfiles.bind(item, item.id))}
            onAdd={createPopup.bind(null, addContact.bind(item, item.id))}
            id={item.id}
            key={item.id}
            isContact={item.isContact}
            share={!sharedContacts.includes(item.id)}
          />
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          containerStyle={styles.search}
          lightTheme={true}
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          onClear={clearSearch}
        />
      </View>
      {contactDisplay}
      <AddButton onPress={() => props.navigation.navigate('Contacts')} />
      {boarding}
      {popup}
    </View>
  );
};

export default ContactScreen;
