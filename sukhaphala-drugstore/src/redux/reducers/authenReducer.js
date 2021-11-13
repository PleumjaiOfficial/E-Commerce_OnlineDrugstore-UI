import { SET_AUTH } from "../actions/authenAction";

const initState = {
    //ไม่ได้ login
    user: [],
}

export const authenReducer = (state = initState , action) => {
    switch (action.type) {
        case SET_AUTH:
            return{
                user:action.payload
            }
        default:
            return initState;
    }
}