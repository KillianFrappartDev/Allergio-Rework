import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  logo: { width: 300, height: 100, marginBottom: 50 },
  signupLabel: { marginBottom: 10 },
  signupButton: {
    backgroundColor: '#6CDCA1',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.25
  },
  signupText: { color: '#FFFFFF' },
  loginLabel: { color: '#6CDCA1' },
  loginButton: {
    borderColor: '#6CDCA1',
    borderWidth: 1,
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  loginText: { color: '#6CDCA1' },
  guest: { marginTop: 20, color: '#007AFF' }
});

export default styles;
