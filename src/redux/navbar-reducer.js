import * as axios from "axios";

const SET_APP_NAME = "SET_APP_NAME"


let initialState = {
    appName: "",

}

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APP_NAME:
            return {
                ...state,
                appName: action.appName
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


export const getAppName = () => async (dispatch) => {

    try {
        let response = await axios.get("http://agro-api.site:4000/appName")
        dispatch(setAppName(response.data.appName))

    } catch (e) {
        dispatch(setAppName("НЕТ СВЯЗИ С СЕРВЕРОМ"))
    }


}


export default navbarReducer