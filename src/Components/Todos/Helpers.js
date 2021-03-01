import {getTodos, setRefreshing} from '../../redux/todos-reducer';
import {getConnectionStatus} from '../../redux/navbar-reducer';
import moment from 'moment';
import _ from 'lodash';


export const onRefresh = (dispatch) => {
  dispatch(setRefreshing(true));
  dispatch(getConnectionStatus());
  dispatch(getTodos());
  setTimeout(() => {
    dispatch(setRefreshing(false));
  }, 2000);
};


export const addingDates = (todosArr) => {
  let date = '';
  return todosArr.map(todo => {
    const todoDate = moment(todo['created']).format('DD MMMM YYYY');
    if (todoDate !== date) {
      date = todoDate;
      return {...todo, date: todoDate};
    } else {
      date = todoDate;
      return todo;
    }
  });
}