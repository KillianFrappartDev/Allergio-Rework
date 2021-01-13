import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    //width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  tag: {
    borderWidth: 1,
    borderColor: '#6CDCA1',
    borderRadius: 10,
    paddingHorizontal: '5%'
  },
  text: {
    color: '#6CDCA1',
    fontSize: 10
  }
});

export default styles;
