import * as axios from "axios";
import {Alert} from "react-native-web";

const SET_IS_LOADING = "SET_IS_LOADING"
const SET_TODO = "SET_TODO"
const SET_TODOS = "SET_TODOS"

const initialState = {
    todos: [
        {id: "1", title: "Test todo LOCAL"}],
    isLoading: false,

}

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.loadingStatus
            }
        case SET_TODO:
            return {
                ...state,
                todos: [...state.todos.concat({id: Date.now().toString(), title: action.todo})]
            }
        case SET_TODOS:
            return {
                ...state,
                todos: action.todos
            }
        default:
            return state
    }
}

const setIsLoading = (loadingStatus) => {
    return {
        type: SET_IS_LOADING,
        loadingStatus
    }
}

const setTodos = (todos) => {
    return {
        type: SET_TODOS,
        todos
    }
}


export const getTodos = () => async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
        let response = await axios.get("http://agro-api.site:4000/todos")
            dispatch(setTodos(response.data))
        
    } catch (e) {
        Alert("Чт то пошло не так")
    }

}

export default todosReducer