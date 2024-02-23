import { navbarApi } from '../../api/api';
import { setScreenToShow } from './screens-reducer';

const APP_INITIALIZE = 'NAV_BAR_PANEL/APP_INITIALIZE';
const SET_APP_NAME = 'NAV_BAR_PANEL/SET_APP_NAME';
const SET_CONNECTION_STATUS = 'NAV_BAR_PANEL/APP_CONNECTION_STATUS';

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
    case SET_CONNECTION_STATUS:
      return {
        ...state,
        connectionStatus: action.status,
      };
    case APP_INITIALIZE:
      return {
        ...state,
        appInitialized: true,
      };
    default:
      return state;
  }
};

const setAppName = (appName) => ({
  type: SET_APP_NAME,
  appName,
});
const setConnectionStatus = (status) => ({
  type: SET_CONNECTION_STATUS,
  status,
});

const setAppInitialize = () => ({
  type: APP_INITIALIZE,
});

// thunk-creator Запроса Title с бэка
const getAppName = () => async (dispatch) => {
  try {
    const response = await navbarApi.getAppNameWithAPI();
    dispatch(setAppName(response.data.appName));
  } catch (e) {
    dispatch(setConnectionStatus(false));
    dispatch(setAppName('НЕТ СВЯЗИ С СЕРВЕРОМ'));
  }
};

// thunk-creator статуса соединения с бэком
export const getConnectionStatus = () => async (dispatch, getState) => {
  try {
    const response = await navbarApi.getConnectionStatusWithAPI();
    if (response.data.status) {
      dispatch(getAppName());
      dispatch(setConnectionStatus(true));
      if (!getState().authApp.authKey) {
        dispatch(setScreenToShow('login'));
      }
      if (!getState().navbarPanel.appInitialized) {
        dispatch(setAppInitialize());
      }
    } else {
      dispatch(setConnectionStatus(false));
    }
  } catch (e) {
    dispatch(setConnectionStatus(false));
    dispatch(setAppName('НЕТ СВЯЗИ С СЕРВЕРОМ'));
  }
};

export default navbarReducer;
