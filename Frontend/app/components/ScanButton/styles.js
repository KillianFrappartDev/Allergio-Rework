import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appButtonContainer: {
    display: 'flex',
    height: 200,
    width: 200,
    elevation: 8,
    backgroundColor: '#6CDCA1',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6
  },
  appButtonText: {
    fontSize: 34,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase'
  }
});

export default styles;
