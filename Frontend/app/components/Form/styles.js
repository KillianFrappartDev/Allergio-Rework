import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    opacity: 0.2,
    marginBottom: 5
  },
  input: {
    // borderRadius: 4,
    // backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '90%',
    marginBottom: 10,
    marginLeft: 10,
    paddingBottom: 5
  },
  inputContainer: {
    marginBottom: 20
  },
  formContent: {
    width: '80%',
  },
  formContentTransparent: {
    width: '80%'
  },
  submit: {
    borderRadius: 20,
    backgroundColor: '#1EB5B4',
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 173
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10
  },
  allergensContainer: {
    width: '90%',
    marginBottom: 10,
    marginLeft: 10,
    marginBottom: 40,
    flexDirection:"row",
    justifyContent:'space-between'
    
  },
  addAllergen: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
    width: 55,
    borderRadius: 20,
    backgroundColor: '#1EB5B4',
  }
});

export default styles;
