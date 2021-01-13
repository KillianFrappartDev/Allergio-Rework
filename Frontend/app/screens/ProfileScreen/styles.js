import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: Constants.statusBarHeight
  },
  allergensContainer: {
    width:"100%",
    marginTop: Constants.statusBarHeight,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
  allergen : {
    alignItems:'center',
    width: '50%',
  },
  titleContainer : {
    marginLeft: 10,
    marginBottom: 20,
    marginTop: 20
  },
  title : {
    color: '#A9A9A9'
  },

  addAllergen: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
    width: 55,
    borderRadius: 20,
    backgroundColor: '#1EB5B4',
  },
  editContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

  },
  avatar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6CDCA1',
    marginBottom: 10,
    width: '100%',
    paddingTop: 20,
  },
  safe: {
    flex: 2,
    backgroundColor: 'white'
  },
  edit: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: '5%',
    marginTop: 10,
    marginBottom:10
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10
  },
  text: {
    color: 'white'
  },
  cards: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  }
});

export default styles;
