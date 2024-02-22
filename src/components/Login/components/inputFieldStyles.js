import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inputFieldBlockWrapper: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  inputFieldBlock: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 15,
  },
  inputField: {
    width: '80%',
    borderBottomColor: '#404040',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    marginBottom: 5,
    fontSize: 16,
  },
});
