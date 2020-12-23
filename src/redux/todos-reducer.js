import * as axios from "axios";
import {Alert} from "react-native-web";


const SET_IS_LOADING = "SET_IS_LOADING"
const SET_NEW_TODO = "SET_NEW_TODO"
const SET_TODOS = "SET_TODOS"
const DELETE_TODO = "DELETE_TODO"
const EDIT_TODO = "EDIT_TODO"
const SET_REFRESHING = "SET_REFRESHING"
const SET_EDIT_MODE = "SET_EDIT_MODE"


const initialState = {
    todos: [],
    isLoading: false,
    isRefreshing: false,
    todoUnderEdit: null,
    showDoneTasks: true


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
        case SET_EDIT_MODE:
            return {
                ...state,
                todos: [...state.todos].map(todo => {
                    if (todo._id === action._id) {
                        todo.editMode = action.value
                        return todo
                    } else{
                        return todo
                    }
                }),
                todoUnderEdit: action.value ? action._id : null
            }
        case SET_NEW_TODO:
            return {
                ...state,
                todos: [action.savedTodo, ...state.todos]
            }
        case SET_TODOS:
            return {
                ...state,
                todos: action.todos
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: [...state.todos].filter(todo => todo._id !== action._id)
            }
        case  EDIT_TODO:
            return {
                ...state,
                todos: [...state.todos].map(todo => {
                    if (todo._id === action.todo._id) {
                        return action.todo
                    } else {
                        return todo
                    }
                })
            }
        case SET_REFRESHING:
            return {
                ...state,
                isRefreshing: action.status
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

export const setEditMode = (_id, value) => {
    return {
        type: SET_EDIT_MODE,
        _id,
        value
    }
}

const setTodos = (todos) => {
    return {
        type: SET_TODOS,
        todos
    }
}

const setNewTodo = (savedTodo) => {
    return {
        type: SET_NEW_TODO,
        savedTodo
    }
}

const setEditedTodo = (todo) => {
    return {
        type: EDIT_TODO,
        todo
    }
}

const deleteTodo = (_id) => {
    return {
        type: DELETE_TODO,
        _id
    }
}

export const setRefreshing = (status) => {
    return {
        type: SET_REFRESHING,
        status
    }
}


//thunk-creator Получение списка заданий
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

//thunk-creator Добавление нового задания
export const addTodo = (title) => async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
        let response = await instance.post("todos", {title: title})

        if (response.status === 200 && response.data.status === 201) {
            dispatch(setNewTodo(response.data.savedTodo))
        }
    } catch (e) {
        Alert("Что то пошло не так: " + e)
    }
    dispatch(setIsLoading(false))
}


//thunk-creator Изменение текста задания
export const editTodo = (_id, newTitle) => async (dispatch) => {

    dispatch(setIsLoading(true))
    try {
        let response = await instance.post("todo-edit", {id: _id, newTitle: newTitle})

        if (response.status === 200 && response.data.status === "Success") {
            dispatch(setEditedTodo(response.data.modifidedTodo))

        }
    } catch (e) {
        Alert("Что то пошло не так: " + e)
    }
    dispatch(setIsLoading(false))
}

//thunk-creator Изменение статуса выполнения задания
export const checkTodo = (_id, isDone) => async (dispatch) => {

    dispatch(setIsLoading(true))
    try {
        let response = await instance.post("todo-done", {id: _id, isDone: isDone})

        if (response.status === 200 && response.data.status === "Success") {
            dispatch(setEditedTodo(response.data.modifidedTodo))

        }
    } catch (e) {
        Alert("Что то пошло не так: " + e)
    }
    dispatch(setIsLoading(false))
}


//thunk-creator Удаление задания
export const removeTodo = (_id) => async (dispatch) => {
    dispatch(setIsLoading(true))
    let response = await instance.delete("todos", {data: {id: _id}})

    try {
        if (response.status === 200 && response.data.status === "Success") {
            dispatch(deleteTodo(_id))
        }
    } catch (e) {
        Alert("Что то пошло не так: " + e)
    }
    dispatch(setIsLoading(false))
}
export default todosReducer