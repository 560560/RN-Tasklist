import {
  setAdditionalTextColor,
  setBackgroundColor,
  setIconSecondColor,
  setMainColor,
  setMainTextColor,
} from '../redux/reducers';

export const resetStyles = (dispatch) => {
  dispatch(setMainColor('#488AC7'));
  dispatch(setMainTextColor('#ffffff'));
  dispatch(setBackgroundColor('#f8f8f8'));
  dispatch(setIconSecondColor('#a5a5a5'));
  dispatch(setAdditionalTextColor('#000000'));
};
