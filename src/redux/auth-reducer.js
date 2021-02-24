import {authApi} from '../api/api';
import {setScreenToShow} from './screens-reducer';

const SET_AUTH_KEY = 'AUTH_APP/SET_AUTH_KEY';
const SET_EMAIL = 'AUTH_APP/SET_EMAIL';
const SET_PASS = 'AUTH_APP/SET_PASS';
const SET_NAME = 'AUTH_APP/SET_NAME';
const SET_ERROR = 'AUTH_APP/SET_ERROR';
const SET_SIGN_UP_STATUS = 'AUTH_APP/SET_SIGN_UP_STATUS';
const SET_IS_LOADING = 'AUTH_APP/SET_IS_LOADING';


const initialState = {
  authKey: null,
  login: null,
  pass: null,
  authError: null,
  signUpStatus: null,
  name: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_KEY:
      return {
        ...state,
        authKey: action.authKey,
      };

    case SET_EMAIL:
      return {
        ...state,
        email: action.email,
      };

    case SET_NAME:
      return {
        ...state,
        name: action.name,
      };

    case SET_PASS:
      return {
        ...state,
        pass: action.pass,
      };

    case SET_ERROR:
      return {
        ...state,
        authError: action.error,
      };

    case SET_SIGN_UP_STATUS:
      return {
        ...state,
        signUpStatus: action.signUpStatus,
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    default:
      return state;


  }
};

//action creater добавления в стейт authKey
export const setAuthKey = (authKey) => ({
  type: SET_AUTH_KEY,
  authKey,

});

//action creater добавления в стейт login
const setEmail = (email) => ({
  type: SET_EMAIL,
  email,

});

//action creater добавления в стейт name
const setName = (name) => ({
  type: SET_NAME,
  name,

});

//action creater добавления в стейт pass
const setPass = (pass) => ({
  type: SET_PASS,
  pass,
});

//action creater добавления в стейт Ошибки с бэка
export const setAuthError = (error) => {
  const errors = {
    'Wrong password': 'Указан неверный логин или пароль. ',
    'No user': 'Пользователя с таким e-mail не существует.',
  };
  return {
    type: SET_ERROR, error: errors[error],
  };
};

//action creater добавления в стейт статуса попытки регистрации
export const setSignUpStatus = (signUpStatus) => {
  const statuses = {
    'Created': {success: true, message: 'Успешная регистрация. Теперь можно авторизоваться. '},
    'Already exist': {success: false, message: 'Пользователь с таким e-mail уже существует.'},
  };
  return {
    type: SET_SIGN_UP_STATUS, signUpStatus: statuses[signUpStatus],
  };
};

const setIsLoading = (loadingStatus) => {
  return {
    type: SET_IS_LOADING,
    loadingStatus,
  };
};

export const logIn = (email, pass, saveMe = false) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await authApi.logInWithAPI(email, pass);
    if (response.status === 200 && response.data.status === 'Authorize success') {
      dispatch(setAuthKey(response.data.authKey));
      dispatch(setName(response.data.name));
      if (saveMe) {
        dispatch(setEmail(email));
        dispatch(setPass(pass));
      }
      dispatch(dispatch(setScreenToShow('todos')));
    } else if (response.status === 200 && response.data.status !== 'Authorize success') {
      dispatch(setAuthError(response.data.status));
    }

  } catch (err) {
    console.error(err);
  }
  dispatch(setIsLoading(false));
};

export const signUpUser = (name, email, pass) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    console.log("name = ", name)
    console.log("email = ", email)
    console.log("pass = ", pass)
    const response = await authApi.signUpUserWithAPI(name, email, pass);
    if (response.status === 200 && response.data.status) {
      dispatch(setSignUpStatus(response.data.status))
    }
  } catch (err) {
    console.error(err);
  }

  dispatch(setIsLoading(false));
};


export default authReducer;