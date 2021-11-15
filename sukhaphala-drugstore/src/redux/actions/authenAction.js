export const SET_AUTH = "SET_AUTH"
export const CLEAR_AUTH = "CLEAR_AUTH"

export const setAuth = (user) => {
    console.log(user)

    return {
        type: SET_AUTH,
        payload: user,
    }
}

export const clearAuth = () => {
    return {
        type: CLEAR_AUTH
    };
}
