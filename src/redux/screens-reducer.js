const SET_SCREEN_TO_SHOW = "SET_SCREEN_TO_SHOW"


let initialState = {
     screenToShow: "todos"

}

const screensReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SCREEN_TO_SHOW:
            return {
                ...state,
                screenToShow: action.screen
            }
        default:
            return state
    }
}


export const setScreenToShow = (screen) => {
    return {
        type: SET_SCREEN_TO_SHOW,
        screen
    }
}


export default screensReducer