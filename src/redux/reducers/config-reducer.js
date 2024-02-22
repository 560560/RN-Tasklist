const SET_MAIN_COLOR = 'SET_MAIN_COLOR';
const SET_MAIN_TEXT_COLOR = 'SET_MAIN_TEXT_COLOR';
const SET_BACKGROUND_COLOR = 'SET_BACKGROUND_COLOR';
const SET_ICON_SECOND_COLOR = 'SET_ICON_SECOND_COLOR';
const SET_ADDITIONAL_TEXT_COLOR = 'SET_ADDITIONAL_TEXT_COLOR';

const initialState = {
  mainColor: '#488AC7',
  mainTextColor: '#ffffff',
  iconSecondColor: '#a5a5a5',
  background: '#f8f8f8',
  secondTextColor: '#000000',
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAIN_COLOR:
      return { ...state, mainColor: action.color };
    case SET_MAIN_TEXT_COLOR:
      return { ...state, mainTextColor: action.color };
    case SET_BACKGROUND_COLOR:
      return { ...state, background: action.color };
    case SET_ICON_SECOND_COLOR:
      return { ...state, iconSecondColor: action.color };
    case SET_ADDITIONAL_TEXT_COLOR:
      return { ...state, secondTextColor: action.color };
    default: {
      return state;
    }
  }
};

export const setMainColor = (color) => ({
  type: SET_MAIN_COLOR,
  color,
});
export const setMainTextColor = (color) => ({
  type: SET_MAIN_TEXT_COLOR,
  color,
});
export const setBackgroundColor = (color) => ({
  type: SET_BACKGROUND_COLOR,
  color,
});
export const setIconSecondColor = (color) => ({
  type: SET_ADDITIONAL_TEXT_COLOR,
  color,
});
export const setAdditionalTextColor = (color) => ({
  type: SET_ADDITIONAL_TEXT_COLOR,
  color,
});

export default configReducer;
