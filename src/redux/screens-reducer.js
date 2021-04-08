const SET_SCREEN_TO_SHOW = 'SET_SCREEN_TO_SHOW';
const SET_SOCKET_CONNECTION_STATUS = 'SET_SOCKET_CONNECTION_STATUS';


let initialState = {
  screenToShow: 'todos',
  socketConnectionStatus: false,

};

const screensReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_SCREEN_TO_SHOW:
      return {
        ...state,
        screenToShow: action.screen,
      };

    case SET_SOCKET_CONNECTION_STATUS:
      return {
        ...state,
        socketConnectionStatus: action.status,
      };

    default:
      return state;
  }
};


export const setScreenToShow = (screen) => {
  return {
    type: SET_SCREEN_TO_SHOW,
    screen,
  };
};

export const setSocketConnectionStatus = (status) => {
  return {
    type: SET_SOCKET_CONNECTION_STATUS,
    status
  }
}


export default screensReducer;