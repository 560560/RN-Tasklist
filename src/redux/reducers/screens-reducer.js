import { AppScreen } from '../../helpers/constants';

const SET_SCREEN_TO_SHOW = 'SET_SCREEN_TO_SHOW';

const initialState = {
  screenToShow: AppScreen.UNDONE_TODOS,
};

const screensReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN_TO_SHOW:
      return {
        ...state,
        screenToShow: action.screen,
      };
    default:
      return state;
  }
};

export const setScreenToShow = (screen) => ({
  type: SET_SCREEN_TO_SHOW,
  screen,
});

export default screensReducer;
