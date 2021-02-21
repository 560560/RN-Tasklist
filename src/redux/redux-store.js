import todosReducer from './todos-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import navbarReducer from './navbar-reducer';
import screensReducer from './screens-reducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage'

let reducers = combineReducers({
  todos: todosReducer,
  navbarPanel: navbarReducer,
  screens: screensReducer,

});

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store);

