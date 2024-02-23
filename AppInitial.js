import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Main } from './src/main';
import { persistor, store } from './src/redux/store';

export default function App() {
  const renderLoading = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={renderLoading()}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
