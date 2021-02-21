import React from 'react';
import Main from './src/main';
import {Provider} from 'react-redux';
import { store, persistor } from './src/redux/redux-store';
import { PersistGate } from 'redux-persist/integration/react'
import {View, ActivityIndicator} from 'react-native';


const App = () => {

  const renderLoading = () => {
    return (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
    );
  };

  return (
      <Provider store={store}>
        <PersistGate
            persistor={persistor}
            loading={renderLoading()}
        >
          <Main/>
        </PersistGate>
      </Provider>
  );
};

export default App;
