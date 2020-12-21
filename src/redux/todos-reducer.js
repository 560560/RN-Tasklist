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
    todoUnderEdit: null

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
                    if (todo.id === action.id) {
                        todo.editMode = action.value
                        return todo
                    } else{
                        return todo
                    }
                }),
                todoUnderEdit: action.value ? action.id : null
            }
        case SET_NEW_TODO:
            return {
                ...state,
                todos: [action.todo, ...state.todos]
            }
        case SET_TODOS:
            return {
                ...state,
                todos: action.todos
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: [...state.todos].filter(todo => todo.id !== action.id)
            }
        case  EDIT_TODO:
            return {
                ...state,
                todos: [...state.todos].map(todo => {
                    if (todo.id === action.todo.id) {
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

export const setEditMode = (id, value) => {
    return {
        type: SET_EDIT_MODE,
        id,
        value
    }
}

const setTodos = (todos) => {
    return {
        type: SET_TODOS,
        todos
    }
}

const setNewTodo = (todo) => {
    return {
        type: SET_NEW_TODO,
        todo
    }
}

const setEditedTodo = (todo) => {

    return {
        type: EDIT_TODO,
        todo
    }
}

const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        id
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
            dispatch(setNewTodo(response.data.newTodo))
        }
    } catch (e) {
        Alert("Что то пошло не так: " + e)
    }
    dispatch(setIsLoading(false))
}


//thunk-creator Изменение текста задания
export const editTodo = (id, newTitle) => async (dispatch) => {

    dispatch(setIsLoading(true))
    try {
        let response = await instance.post("todo-edit", {id: id, newTitle: newTitle})

        if (response.status === 200 && response.data.status === 201) {
            dispatch(setEditedTodo(response.data.modifidedTodo[0]))

        }
    } catch (e) {
        Alert("Что то пошло не так: " + e)
    }
    dispatch(setIsLoading(false))
}

//thunk-creator Изменение статуса выполнения задания
export const checkTodo = (id) => async (dispatch) => {

    dispatch(setIsLoading(true))
    try {
        let response = await instance.post("todo-done", {id: id})

        if (response.status === 200 && response.data.status === 201) {
            dispatch(setEditedTodo(response.data.modifidedTodo[0]))

        }
    } catch (e) {
        Alert("Что то пошло не так: " + e)
    }
    dispatch(setIsLoading(false))
}


//thunk-creator Удаление задания
export const removeTodo = (id) => async (dispatch) => {
    dispatch(setIsLoading(true))
    console.log(1)
    let response = await instance.delete("todos", {data: {id: id}})
    try {
        if (response.status === 200 && response.data.status === "Success") {
            dispatch(deleteTodo(id))
            console.log(response.data.message)

        }
    } catch (e) {
        Alert("Что то пошло не так: " + e)
    }
    dispatch(setIsLoading(false))
}
export default todosReducer