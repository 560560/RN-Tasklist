import {infoAlert} from '../Common/allertsModal';
import {navbarApi} from '../api/api';
import {setScreenToShow} from './screens-reducer';

const SET_APP_NAME = 'NAV_BAR_PANEL/SET_APP_NAME';
const APP_INITIALIZE = 'NAV_BAR_PANEL/APP_INITIALIZE';

const initialState = {
  appName: '',
  connectionStatus: false,
  appInitialized: false,
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_NAME:
      return {
        ...state,
        appName: action.appName,
      };
    case APP_INITIALIZE :
      return {
        ...state,
        appInitialized: true,
      };
    default:
      return state;
  }
};

const setAppName = (appName) => {
  return {
    type: SET_APP_NAME,
    appName,
  };
};

const setAppInitialize = () => ({
  type: APP_INITIALIZE,
});


//thunk-creator Запроса Title с бэка
const getAppName = () => async (dispatch) => {
  try {
    const response = await navbarApi.getAppNameWithAPI();

    dispatch(setAppName(response.data.appName));

  } catch (e) {
    dispatch(setAppName('НЕТ СВЯЗИ С СЕРВЕРОМ'));
  }
};

//thunk-creator статуса соединения с бэка
export const getConnectionStatus = () => async (dispatch, getState) => {
  try {
    const response = await navbarApi.getConnectionStatusWithAPI();
    if (response.data.status) {
      dispatch(getAppName());
      if (!getState().authApp.authKey) {
        dispatch(setScreenToShow('login'));
      }
      if (!getState().navbarPanel.appInitialized) {
        dispatch(setAppInitialize());
      }
    } else {
      infoAlert('Ошибка запроса на сервер', 'Проверьте связь с сетью Интернет');
    }

  } catch (e) {
    infoAlert('Ошибка запроса на сервер', 'Проверьте связь с сетью Интернет');
    if (!getState().navbarPanel.appName) {
      dispatch(setAppName('НЕТ СВЯЗИ С СЕРВЕРОМ'));
    } else {
      dispatch(setAppName('СВЯЗЬ С СЕРВЕРОМ ПОТЕРЯНА'));
    }
  }
};

export default navbarReducer;