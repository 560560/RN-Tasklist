import {getTodos, setRefreshing} from '../../redux/todos-reducer';
import {getConnectionStatus} from '../../redux/navbar-reducer';


export const onRefresh = (dispatch) => {
  dispatch(setRefreshing(true));
  dispatch(getConnectionStatus());
  dispatch(getTodos());
  setTimeout(() => {
    dispatch(setRefreshing(false));
  }, 2000);
};