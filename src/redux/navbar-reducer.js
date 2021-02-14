import * as axios from "axios";
import {errorAlert} from "../Common/errorAllert";

const SET_APP_NAME = "SET_APP_NAME"
const SET_CONNECTION_STATUS = "SET_CONNECTION_STATUS"
const SET_CONNECTION_TRYING = "SET_CONNECTION_TRYING"


let initialState = {
    appName: "",
    connectionStatus: false,
}

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APP_NAME:
            return {
                ...state,
                appName: action.appName
            }

        case SET_CONNECTION_STATUS:
            return {
                ...state,
                connectionStatus: action.status
            }


        default:
            return state
    }
}

const setAppName = (appName) => {
    return {
        type: SET_APP_NAME,
        appName
    }
}

const setConnectionStatus = (status) => {
    return {
        type: SET_CONNECTION_STATUS,
        status
    }
}


//thunk-creator Запроса Title с бэка
const getAppName = () => async (dispatch) => {
    try {
        let response = await axios.get("http://agro-api.site:4000/appName")
        dispatch(setAppName(response.data.appName))

    } catch (e) {
        dispatch(setAppName("НЕТ СВЯЗИ С СЕРВЕРОМ"))
    }
}

//thunk-creator статуса соединения с бэка
export const getConnectionStatus = () => async (dispatch, getState) => {
    try {
        let response = await axios.get("http://agro-api.site:4000/status")
        if (response.data.status) {
            dispatch(getAppName())
        } else {
            errorAlert()
        }

    } catch (e) {
        errorAlert()
        if (!getState().navbarPanel.appName) {
            dispatch(setAppName("НЕТ СВЯЗИ С СЕРВЕРОМ"))
        } else {
            dispatch(setAppName("СВЯЗЬ С СЕРВЕРОМ ПОТЕРЯНА"))
        }
    }
}

export default navbarReducer