import React from 'react';

// Local imports
import Card from '../Card/index';
import styles from './styles';

const CardList = ({ profilesList }) => {
  return profilesList.map(profile => <Card {...profile} key={profile._id} />);
};

export default CardList;
