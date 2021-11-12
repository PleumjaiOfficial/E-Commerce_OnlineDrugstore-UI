export const SET_AUTH = "SET_AUTH"

export const setAuth = (user) => {
    console.log(user)
    
    return {
        type: SET_AUTH,
        payload: user,
    }
}
