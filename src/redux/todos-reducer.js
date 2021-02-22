import * as axios from 'axios';
import {Alert} from 'react-native';
import {getConnectionStatus} from './navbar-reducer';
import {todosApi} from '../api/api';
import {infoAlert} from '../Common/allertsModal';
import {setAuthKey} from './auth-reducer';

const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_NEW_TODO = 'SET_NEW_TODO';
const SET_TODOS = 'SET_TODOS';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const SET_REFRESHING = 'SET_REFRESHING';
const SET_EDIT_MODE = 'SET_EDIT_MODE';
const SET_SHOW_DONE_TASKS = 'SET_SHOW_DONE_TASKS';

const initialState = {
  todos: null,
  isLoading: false,
  isRefreshing: false,
  todoUnderEdit: null,
  showDoneTasks: true,
};

const instance = axios.create({
  baseURL: 'http://agro-api.site:4000/',
  headers: {'Content-Type': 'application/json'},
});

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
        todos: [...state.todos].map(todo => {
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
        todos: [...state.todos].filter(todo => todo._id !== action._id),
      };
    case  EDIT_TODO:
      return {
        ...state,
        todos: [...state.todos].map(todo => {
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

//thunk-creator Получение списка заданий
export const getTodos = () => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  try {
    dispatch(getConnectionStatus());
    const authKey = getState().authApp.authKey;
    const response = await todosApi.getTodosWithAPI(authKey);
    if (response.status === 200 && response.data.status === 'Loaded') {
      dispatch(setTodos(response.data.todos));
    }
    if (response.status === 200 && response.data.status === 'Auth Fail'){
     dispatch(setAuthKey(null))
    }

  } catch (e) {
    infoAlert('Ответ от сервера:', 'Ошибка выполнения запроса');
  }
  dispatch(setIsLoading(false));

};

//thunk-creator Добавление нового задания
export const addTodo = (title) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    dispatch(getConnectionStatus());
    const response = await todosApi.addTodoWithAPI(title);
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
    const response = await todosApi.editTodoWithAPI(_id, newTitle);
    if (response.status === 200 && response.data.status === 'Success') {
      dispatch(setEditedTodo(response.data.modifidedTodo));

    } else if (response.status === 200 && response.data.status === 'Empty id') {
      infoAlert('Ответ от сервера:', ' id не передан');

    } else if (response.status === 200 && response.data.status === 'Empty authKey') {
      infoAlert('Ответ от сервера:', 'authKey не передан');
    }
  } catch (e) {
    infoAlert('Ответ от сервера:', 'Ошибка выполнения запроса');
  }
  dispatch(setIsLoading(false));
};

//thunk-creator Изменение статуса выполнения задания
export const checkTodo = (_id, isDone) => async (dispatch) => {

  dispatch(setIsLoading(true));
  try {
    dispatch(getConnectionStatus());
    const response = await instance.post('todo-done', {id: _id, isDone: isDone});

    if (response.status === 200 && response.data.status === 'Success') {
      dispatch(setEditedTodo(response.data.modifidedTodo));

    }
  } catch (e) {
    infoAlert('Ответ от сервера:', 'Ошибка выполнения запроса');
  }
  dispatch(setIsLoading(false));
};


//thunk-creator Удаление задания
export const removeTodo = (_id) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await instance.delete('todos', {data: {id: _id}});

  try {
    dispatch(getConnectionStatus());
    if (response.status === 200 && response.data.status === 'Success') {
      dispatch(deleteTodo(_id));
    }
  } catch (e) {
    infoAlert('Ответ от сервера:', 'Ошибка выполнения запроса');
  }
  dispatch(setIsLoading(false));
};
export default todosReducer;