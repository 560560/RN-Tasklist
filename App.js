import React, {useEffect} from 'react';
import Main from './src/main';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store, persistor} from './src/redux/redux-store';
import {PersistGate} from 'redux-persist/integration/react';
import {View, ActivityIndicator} from 'react-native';
import {getConnectionStatus} from './src/redux/navbar-reducer';


const App = () => {

  const renderLoading = () => {
    return (
        <View>
          <ActivityIndicator size={'large'}/>
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
