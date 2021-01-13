import React from 'react';
import { View, Text, Image, Button } from 'react-native';

// Local imports
import styles from './styles';

const Contact = props => {
  let shareButton;
  if (props.share) {
    shareButton = <Button style={styles.button} title="Share" onPress={props.onShare.bind(null, props.id)} />;
  } else {
    if (!props.phone) {
      shareButton = <Button style={styles.button} title="Unshare" onPress={props.onUnshare.bind(null, props.id)} />;
    }
  }

  let contactDisplay;
  if (props.phone) {
    contactDisplay = (
      <View>
        <Text style={styles.name}>{props.name}</Text>
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            onPress={props.onInvite.bind(null, props.id, props.number)}
            title="Invite"
            color="green"
          />
        </View>
      </View>
    );
  } else {
    contactDisplay = (
      <View>
        <Text style={styles.name}>{props.name}</Text>
        {props.isContact === false ? (
          <View style={styles.buttons}>
            <Button style={styles.button} onPress={props.onAdd.bind(null, props.id)} title="Add" color="green" />
          </View>
        ) : (
          <View style={styles.buttons}>
            {shareButton}
            <Button onPress={props.onDelete.bind(null, props.id)} style={styles.button} title="Remove" color="red" />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
        }}
        style={styles.image}
      />
      {contactDisplay}
    </View>
  );
};

export default Contact;
