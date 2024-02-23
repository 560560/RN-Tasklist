import { todosApi } from '../../api/api';
import { infoAlert } from '../../common/allertsModal';
import { AppScreen } from '../../helpers/constants';
import { setAuthKey } from './auth-reducer';
import { getConnectionStatus } from './navbar-reducer';

const ServerResponseStatus = {
  CREATED: 'Created',
  EMPTY_ID: 'Empty id',
  EMPTY_AUTH_KEY: 'Empty authKey',
  MODIFIED: 'Modified',
  DELETED: 'Deleted',
  LOADED: 'Loaded',
  AUTH_FAIL: 'Auth Fail',
};

const SET_IS_LOADING = 'TODOS/SET_IS_LOADING';
const SET_NEW_TODO = 'TODOS/SET_NEW_TODO';
const SET_TODOS = 'TODOS/SET_TODOS';
const DELETE_TODO = 'TODOS/DELETE_TODO';
const EDIT_TODO = 'TODOS/EDIT_TODO';
const CLEAR_TODO_UNDER_EDIT = 'CLEAR_TODO_UNDER_EDIT';
const SET_REFRESHING = 'TODOS/SET_REFRESHING';
const SET_EDIT_MODE = 'TODOS/SET_EDIT_MODE';
const SET_DELETE_MODE = 'TODOS/SET_DELETE_MODE';
const SET_DONE_TODOS = 'TODOS/SET_DONE_TODOS';
const SET_ERROR_CONNECTION_COUNTER = 'TODOS/SET_ERROR_CONNECTION_COUNTER';
const SET_DONE_TODOS_FILER = 'TODOS/SET_DONE_TODOS_FILER';
const INCREASE_OFFSET = 'INCREASE_OFFSET';

const initialState = {
  todos: null,
  doneTodos: null,
  isLoading: false,
  isRefreshing: false,
  todoUnderEdit: null,
  deleteMode: false,
  errorConnectionCounter: 0,
  doneTodosFilter: '',
  doneTodosOffset: 1,
  doneTodosLimit: 15,
};

const todosReducer = (state = initialState, action) => {
  const todosSource = action.renderScreen === AppScreen.UNDONE_TODOS ? 'todos' : 'doneTodos';

  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.loadingStatus,
      };

    case SET_EDIT_MODE:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, editMode: action.value };
          } else {
            return todo;
          }
        }),
        todoUnderEdit: action.value ? action.id : null,
      };

    case CLEAR_TODO_UNDER_EDIT:
      return {
        ...state,
        todoUnderEdit: null,
      };

    case SET_NEW_TODO:
      return {
        ...state,
        [todosSource]: [action.newTodo, ...state.todos],
      };

    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case SET_DONE_TODOS:
      return {
        ...state,
        doneTodos: action.doneTodos,
      };

    case DELETE_TODO:
      return {
        ...state,
        [todosSource]: state[todosSource].filter((todo) => todo.id !== action.id),
      };

    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.todo.id) {
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

    case SET_ERROR_CONNECTION_COUNTER:
      return {
        ...state,
        errorConnectionCounter: action.counter,
      };

    case SET_DONE_TODOS_FILER:
      return {
        ...state,
        doneTodosFilter: action.filterValue,
      };

    case SET_DELETE_MODE:
      return {
        ...state,
        deleteMode: action.deleteModeValue,
      };

    case INCREASE_OFFSET:
      return {
        ...state,
        doneTodosOffset: state.doneTodosOffset + 1,
      };

    default:
      return state;
  }
};

export const increaseOffset = () => ({
  type: INCREASE_OFFSET,
});

const setIsLoading = (loadingStatus) => ({
  type: SET_IS_LOADING,
  loadingStatus,
});

export const setDeleteMode = (deleteModeValue) => ({
  type: SET_DELETE_MODE,
  deleteModeValue,
});

export const setEditMode = (id, value) => ({
  type: SET_EDIT_MODE,
  id,
  value,
});

export const clearTodoUnderEdit = () => ({
  type: CLEAR_TODO_UNDER_EDIT,
});

const setTodos = (todos) => ({
  type: SET_TODOS,
  todos,
});

const setDoneTodos = (doneTodos) => ({
  type: SET_DONE_TODOS,
  doneTodos,
});

const setNewTodo = (newTodo, renderScreen) => ({
  type: SET_NEW_TODO,
  newTodo,
  renderScreen,
});

const setEditedTodo = (todo, renderScreen) => ({
  type: EDIT_TODO,
  todo,
  renderScreen,
});

const deleteTodo = (id, renderScreen) => ({
  type: DELETE_TODO,
  id,
  renderScreen,
});

const setErrorCounter = (counter) => ({
  type: SET_ERROR_CONNECTION_COUNTER,
  counter,
});

export const setRefreshing = (status) => ({
  type: SET_REFRESHING,
  status,
});

export const setDoneTodosFilter = (value) => ({
  type: SET_DONE_TODOS_FILER,
  filterValue: value,
});

const getAuthKey = async (dispatch, getState) => {
  await dispatch(getConnectionStatus());
  return getState().authApp.authKey;
};

const serverErrorAlert = () => infoAlert('Нет ответа от сервера:', 'Проверьте связь');

const fetchTodos = async (dispatch, getState) => {
  const authKey = await getAuthKey(dispatch, getState);
  const response = await todosApi.getTodosWithAPI(authKey);

  if (response.status === 200 && response.data.status === ServerResponseStatus.LOADED) {
    dispatch(setTodos(response.data.todos));
  } else if (response.status === 200 && response.data.status === ServerResponseStatus.AUTH_FAIL) {
    dispatch(setAuthKey(null));
  }
};
const fetchDoneTodos = async (dispatch, getState) => {
  const authKey = await getAuthKey(dispatch, getState);
  const response = await todosApi.getDoneTodosWithAPI(authKey);

  if (response.status === 200 && response.data.status === ServerResponseStatus.LOADED) {
    dispatch(setDoneTodos(response.data.todos));
  } else if (response.status === 200 && response.data.status === ServerResponseStatus.AUTH_FAIL) {
    dispatch(setAuthKey(null));
  }
};

// thunk-creator Синхронизации списка Задач с БД раз в 5 сек.
export const autoGetTodos = () => async (dispatch, getState) => {
  const errorCounter = getState().todos.errorConnectionCounter;
  if (errorCounter >= 0 && errorCounter < 1) {
    try {
      await fetchTodos(dispatch, getState);
      setErrorCounter(0);
    } catch (err) {
      setErrorCounter(errorCounter + 1);
      setTimeout(() => serverErrorAlert(), 1000);
    }
  }
};

// thunk-creator Получение списка заданий
export const getTodos = () => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  try {
    await fetchTodos(dispatch, getState);
  } catch (e) {
    serverErrorAlert();
  } finally {
    dispatch(setIsLoading(false));
  }
};
export const getDoneTodos = () => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  try {
    await fetchDoneTodos(dispatch, getState);
  } catch (e) {
    serverErrorAlert();
  } finally {
    dispatch(setIsLoading(false));
  }
};

// thunk-creator Добавление нового задания
export const addTodo = (title) => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  try {
    const authKey = await getAuthKey(dispatch, getState);
    const response = await todosApi.addTodoWithAPI(title, authKey);
    if (response.status === 200 && response.data.status === ServerResponseStatus.CREATED) {
      dispatch(setNewTodo(response.data.todos[0], AppScreen.UNDONE_TODOS));
    }
  } catch (e) {
    serverErrorAlert(e);
  } finally {
    dispatch(setIsLoading(false));
  }
};

// thunk-creator Изменение текста задания
export const editTodo = (id, newTitle) => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  try {
    const authKey = await getAuthKey(dispatch, getState);
    const response = await todosApi.editTodoWithAPI(id, newTitle, authKey);
    if (response.status === 200 && response.data.status === ServerResponseStatus.MODIFIED) {
      dispatch(setEditedTodo(response.data.todos[0]));
    } else if (response.status === 200 && response.data.status === ServerResponseStatus.EMPTY_ID) {
      infoAlert('Ответ от сервера:', ' id не передан');
    } else if (
      response.status === 200 &&
      response.data.status === ServerResponseStatus.EMPTY_AUTH_KEY
    ) {
      infoAlert('Ответ от сервера:', 'authKey не передан');
    }
  } catch (e) {
    serverErrorAlert();
  } finally {
    dispatch(setIsLoading(false));
  }
};

// thunk-creator Изменение статуса выполнения задания
export const toggleTodoStatus = (id, done, renderScreen) => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  try {
    const authKey = await getAuthKey(dispatch, getState);
    const response = await todosApi.checkTodoWithAPI(id, done, authKey);
    if (response.status === 200 && response.data.status === ServerResponseStatus.MODIFIED) {
      dispatch(deleteTodo(response.data.todos[0].id, renderScreen));
      if (renderScreen === AppScreen.DONE_TODOS) {
        dispatch(getTodos());
      } else {
        dispatch(getDoneTodos());
      }
    }
  } catch (e) {
    serverErrorAlert();
  } finally {
    dispatch(setIsLoading(false));
  }
};

// thunk-creator Удаление задания
export const removeTodo = (id, renderScreen) => async (dispatch, getState) => {
  dispatch(setIsLoading(true));
  try {
    const authKey = await getAuthKey(dispatch, getState);
    const response = await todosApi.deleteTodoWithAPI(id, authKey);
    if (response.status === 200 && response.data.status === ServerResponseStatus.DELETED) {
      dispatch(deleteTodo(id, renderScreen));
    }
  } catch (e) {
    serverErrorAlert();
  } finally {
    dispatch(setIsLoading(false));
    dispatch(setDeleteMode(false));
  }
};
export default todosReducer;
