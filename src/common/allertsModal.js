import { Alert } from 'react-native';

export const infoAlert = (info1, info2, cb = null) => {
  Alert.alert(
    `${info1}`,
    `${info2}`,
    [
      {},
      {
        text: 'OK',
        onPress: () => {
          if (cb) {
            cb();
          }
        },
      },
    ],
    { cancelable: false }
  );
};
