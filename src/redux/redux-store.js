import todosReducer from './todos-reducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import navbarReducer from './navbar-reducer';
import screensReducer from './screens-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './auth-reducer';
import configReducer from './config-reducer';

let reducers = combineReducers({
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
