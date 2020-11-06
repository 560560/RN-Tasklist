import * as axios from "axios";
import {Alert} from "react-native-web";


const SET_IS_LOADING = "SET_IS_LOADING"
const SET_TODO = "SET_TODO"
const SET_TODOS = "SET_TODOS"

const initialState = {
    todos: [],
    isLoading: false,

}

const instance = axios.create({
    baseURL: "http://agro-api.site:4000/",
    headers: {'Content-Type': 'application/json'}
})

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
                todos: [...state.todos.concat(action.todo)]
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

const setTodo = (todo) => {
    return {
        type: SET_TODO,
        todo
    }
}

export const getTodos = () => async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
        let response = await instance.get("todos")
        dispatch(setTodos(response.data))

    } catch (e) {
        Alert("Что то пошло не так: " + e)
    }
    dispatch(setIsLoading(false))

}


export const addTodo = (title) => async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
        let response = await instance.post("todos", {title: title})
        //Если статус 200 надо запушить в todos
        if (response.status === 200 && response.data.status === 201) {
            dispatch(setTodo(response.data.newTodo))
        }
    } catch (e) {
        Alert("Что то пошло не так: " + e)
    }
    dispatch(setIsLoading(false))
}


export default todosReducer