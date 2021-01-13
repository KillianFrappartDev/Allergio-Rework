import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 30,
    marginTop: 50,
    marginLeft: 20,
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: 300
  },
  content: {
    flexDirection: 'column',
    marginLeft: 20
  },
  subtitle: {
    fontSize: 25,
    marginVertical: 20
  },
  text: {
    color: 'rgba(0, 0, 0, 0.5)'
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
