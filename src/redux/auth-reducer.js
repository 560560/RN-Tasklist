const SET_AUTH_KEY = 'SET_AUTH_KEY';
const SET_EMAIL = 'SET_EMAIL';
const SET_PASS = 'SET_PASS';


const initialState = {
  authKey: '6a7c4620-714a-11eb-8927-214edb85a988!',
  login: null,
  pass: null,
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

    case SET_PASS:
      return {
        ...state,
        pass: action.pass,
      };

      default:
      return state;


  }
};

//action creater добавления в стейт authKey
export const setAuthKey = (authKey) => ({
  type: SET_AUTH_KEY,
  authKey

})

//action creater добавления в стейт login
const setLogin = (email) => ({
  type: SET_EMAIL,
  email

})

//action creater добавления в стейт pass
const set = (pass) => ({
  type: SET_PASS,
  pass
})

/*

export const logIn = (email, pass, saveMe) => async (dispatch) => {
  try {
       const response = await axios
  }
  catch (err) {
    console.error(err)
  }
}
*/


export default authReducer