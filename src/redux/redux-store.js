import todosReducer from "./todos-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import navbarReducer from "./navbar-reducer";
import screensReducer from "./screens-reducer";

let reducers = combineReducers({
    todos: todosReducer,
    navbarPanel: navbarReducer,
    screens: screensReducer

})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))


export default store