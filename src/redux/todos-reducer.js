import * as axios from 'axios';
import { getConnectionStatus } from './navbar-reducer';
import { todosApi } from '../api/api';
import { infoAlert } from '../Common/allertsModal';
import { setAuthKey } from './auth-reducer';

const SET_IS_LOADING = 'TODOS/SET_IS_LOADING';
const SET_NEW_TODO = 'TODOS/SET_NEW_TODO';
const SET_TODOS = 'TODOS/SET_TODOS';
const DELETE_TODO = 'TODOS/DELETE_TODO';
const EDIT_TODO = 'TODOS/EDIT_TODO';
const SET_REFRESHING = 'TODOS/SET_REFRESHING';
const SET_EDIT_MODE = 'TODOS/SET_EDIT_MODE';
const SET_SHOW_DONE_TASKS = 'TODOS/SET_SHOW_DONE_TASKS';
const SET_ERROR_CONNECTION_COUNTER = 'TODOS/SET_ERROR_CONNECTION_COUNTER';

const initialState = {
  todos: null,
  isLoading: false,
  isRefreshing: false,
  todoUnderEdit: null,
  showDoneTasks: true,
  errorConnectionCounter: 0,
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.loadingStatus,
      };

    case SET_EDIT_MODE:
      return {
        ...state,
        todos: [...state.todos].map((todo) => {
          if (todo._id === action._id) {
            todo.editMode = action.value;
            return todo;
          } else {
            return todo;
          }
        }),
        todoUnderEdit: action.value ? action._id : null,
      };

    case SET_NEW_TODO:
      return {
        ...state,
        todos: [action.savedTodo, ...state.todos],
      };

    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter((todo) => todo._id !== action._id),
      };

    case EDIT_TODO:
      return {
        ...state,
        todos: [...state.todos].map((todo) => {
          if (todo._id === action.todo._id) {
            return action.todo;
          } else {
            return todo;
          }
        }),
      };

    case SET_REFRESHING:
      return {
        ...state,
        isRefreshing: action.status,
      };

    case SET_SHOW_DONE_TASKS:
      return {
        ...state,
        showDoneTasks: action.newValue,
      };
    case SET_ERROR_CONNECTION_COUNTER:
      return {
        ...state,
        errorConnectionCounter: action.counter,
      };
    default:
      return state;
  }
};

const setIsLoading = (loadingStatus) => {
  return {
    type: SET_IS_LOADING,
    loadingStatus,
  };
};

export const setEditMode = (_id, value) => {
  return {
    type: SET_EDIT_MODE,
    _id,
    value,
  };
};

const setTodos = (todos) => {
  return {
    type: SET_TODOS,
    todos,
  };
};

const setNewTodo = (savedTodo) => {
  return {
    type: SET_NEW_TODO,
    savedTodo,
  };
};

const setEditedTodo = (todo) => {
  return {
    type: EDIT_TODO,
    todo,
  };
};

const deleteTodo = (_id) => {
  return {
    type: DELETE_TODO,
    _id,
  };
};

const setErrorCounter = (counter) => {
  return {
    type: SET_ERROR_CONNECTION_COUNTER,
    counter,
  };
};

export const setRefreshing = (status) => {
  return {
    type: SET_REFRESHING,
    status,
  };
};

export const setShowDoneTasks = (newValue) => {
  return {
    type: SET_SHOW_DONE_TASKS,
    newValue,
  };
};

//thunk-creator Синхронизации списка Задач с БД раз в 5 сек.
export const autoGetTodos = () => async (dispatch, getState) => {
  if (
    getState().todos.errorConnectionCounter >= 0 &&
    getState().todos.errorConnectionCounter < 3
  ) {
    try {
      dispatch(getConnectionStatus());
      const authKey = getState().authApp.authKey;
      const response = await todosApi.getTodosWithAPI(authKey);
      if (response.status === 200 && response.data.status === 'Loaded') {
        dispatch(setTodos(response.data.todos));
      } else if (
        response.status === 200 &&
        response.data.status === 'Auth Fail'
      ) {
        dispatch(setAuthKey(null));
      }
      setErrorCounter(0);
    } catch (e) {
      setErrorCounter(++getState().todos.errorConnectionCounter);
      infoAlert('Нет ответа от сервера:', 'Проверьте связь');
    }
  }
};

//thunk-creator Получение списка заданий
export const getTodos = () => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  try {
    dispatch(getConnectionStatus());
    const authKey = getState().authApp.authKey;
    const response = await todosApi.getTodosWithAPI(authKey);
    if (response.status === 200 && response.data.status === 'Loaded') {
      dispatch(setTodos(response.data.todos));
    } else if (
      response.status === 200 &&
      response.data.status === 'Auth Fail'
    ) {
      dispatch(setAuthKey(null));
    }
  } catch (e) {
    infoAlert('Ответ от сервера:', 'Ошибка выполнения запроса');
  }
  dispatch(setIsLoading(false));
};

//thunk-creator Добавление нового задания
export const addTodo = (title) => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  try {
    dispatch(getConnectionStatus());
    const authKey = getState().authApp.authKey;
    const response = await todosApi.addTodoWithAPI(title, authKey);
    if (response.status === 200 && response.data.status === 'Created') {
      dispatch(setNewTodo(response.data.savedTodo));
    }
  } catch (e) {
    infoAlert('Ответ от сервера:', 'Ошибка выполнения запроса');
  }
  dispatch(setIsLoading(false));
};

//thunk-creator Изменение текста задания
export const editTodo = (_id, newTitle) => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  try {
    dispatch(getConnectionStatus());
    const authKey = getState().authApp.authKey;
    const response = await todosApi.editTodoWithAPI(_id, newTitle, authKey);
    if (response.status === 200 && response.data.status === 'Modified') {
      dispatch(setEditedTodo(response.data.modifidedTodo));
    } else if (response.status === 200 && response.data.status === 'Empty id') {
      infoAlert('Ответ от сервера:', ' id не передан');
    } else if (
      response.status === 200 &&
      response.data.status === 'Empty authKey'
    ) {
      infoAlert('Ответ от сервера:', 'authKey не передан');
    }
  } catch (e) {
    infoAlert('Ответ от сервера:', 'Ошибка выполнения запроса');
  }
  dispatch(setIsLoading(false));
};

//thunk-creator Изменение статуса выполнения задания
export const checkTodo = (_id, isDone) => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  try {
    const authKey = getState().authApp.authKey;
    dispatch(getConnectionStatus());
    const response = await todosApi.checkTodoWithAPI(_id, isDone, authKey);
    if (response.status === 200 && response.data.status === 'Modified') {
      dispatch(setEditedTodo(response.data.modifidedTodo));
    }
  } catch (e) {
    infoAlert('Ответ от сервера:', 'Ошибка выполнения запроса');
  }
  dispatch(setIsLoading(false));
};

//thunk-creator Удаление задания
export const removeTodo = (_id) => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  try {
    dispatch(getConnectionStatus());
    const authKey = getState().authApp.authKey;
    const response = await todosApi.deleteTodoWithAPI(_id, authKey);
    if (response.status === 200 && response.data.status === 'Deleted') {
      dispatch(deleteTodo(_id));
    }
  } catch (e) {
    infoAlert('Ответ от сервера:', 'Ошибка выполнения запроса');
  }
  dispatch(setIsLoading(false));
};
export default todosReducer;
