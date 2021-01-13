import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    backgroundColor: 'white',
    padding: 16,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  expand: {
    width: '30%',
    height: 3,
    borderRadius: 5,
    backgroundColor: '#D3D3D3'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%'
  },
  image: {
    marginVertical: 20,
    marginLeft: 0,
    marginRight: 30,
    width: 70,
    height: 100
  },
  title: {
    fontSize: 25,
    width: '80%'
  },
  titleNoImg: {
    fontSize: 25,
    width: '100%'
  },
  section: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '80%',
    marginVertical: 20
  },
  listTitle: {
    fontSize: 18
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  listItem: {
    margin: 10,
    color: '#6CDCA1',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: '#6CDCA1'
  },
  profileItem: {
    marginTop: 10,
    marginRight: 20,
    width: 60,
    height: 60,
    borderRadius: 10
  }
});

export default styles;
