import moment from 'moment';

import {
  clearTodoUnderEdit,
  getConnectionStatus,
  getDoneTodos,
  getTodos,
  setRefreshing,
} from '../../../redux/reducers';
import { AppScreen } from '../../../helpers/constants';

export const onRefresh = (dispatch, currentScreen) => {
  dispatch(setRefreshing(true));
  dispatch(clearTodoUnderEdit());
  dispatch(getConnectionStatus());

  if (currentScreen === AppScreen.UNDONE_TODOS) {
    dispatch(getTodos());
  }

  if (currentScreen === AppScreen.DONE_TODOS) {
    dispatch(getDoneTodos());
  }

  setTimeout(() => {
    dispatch(setRefreshing(false));
  }, 2000);
};

export const addingDates = (todosArr) => {
  let date = '';
  return todosArr.map((todo) => {
    const todoDate = moment(new Date(todo.dateTime)).format('DD MMMM YYYY');
    if (todoDate !== date) {
      date = todoDate;
      return { ...todo, date: todoDate };
    } else {
      date = todoDate;
      return todo;
    }
  });
};
