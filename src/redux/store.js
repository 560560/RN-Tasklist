import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

import authReducer from './reducers/auth-reducer';
import todosReducer from './reducers/todos-reducer';
import navbarReducer from './reducers/navbar-reducer';
import screensReducer from './reducers/screens-reducer';
import configReducer from './reducers/config-reducer';

const reducers = combineReducers({
  todos: todosReducer,
  navbarPanel: navbarReducer,
  screens: screensReducer,
  authApp: authReducer,
  config: configReducer,
});

const persistConfig = {
  key: 'root',
  blacklist: ['screens', 'navbarPanel', 'todos'],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store);
