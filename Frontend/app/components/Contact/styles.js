import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20
  },
  image: { width: 75, height: 75, borderRadius: 50, marginRight: 15 },
  name: { fontSize: 23 },
  button: { height: 10 },
  buttons: { flexDirection: 'row' }
});

export default styles;
