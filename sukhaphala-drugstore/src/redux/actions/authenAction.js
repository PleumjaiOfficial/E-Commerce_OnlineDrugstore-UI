export const SET_AUTH = "SET_AUTH"
export const CLEAR_AUTH = "CLEAR_AUTH"

export const setAuth = (user) => {
    return {
        // set data to case SET_AUTH in authenReducer
        type: SET_AUTH,
        // payload get data from api
        payload: user,
    }
}

export const clearAuth = () => {
    return {
        // set empty data to case CLEAR_AUTH in authenReducer
        type: CLEAR_AUTH
    };
}
