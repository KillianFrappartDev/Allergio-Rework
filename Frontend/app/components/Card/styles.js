import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ViewContainer: {
    width: '50%',
    alignItems:'center'
  },
  container: {
    display: 'flex',
    height: 180,
    width: 160,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  image: {
    height: 90,
    width: '100%'
  },
  text: {
    margin: 10
  }
});

export default styles;
