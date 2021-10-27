export const SET_AUTH = "SET_AUTH"

export const setAuth = (user) => {
    return {
        type: SET_AUTH,
        payload: user,
    }
}
