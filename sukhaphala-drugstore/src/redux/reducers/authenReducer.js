import { SET_AUTH, CLEAR_AUTH } from "../actions/authenAction";

const initState = {
    // user doesn't login
    user: [], 
}

export const authenReducer = (state = initState , action) => {
    switch (action.type) {
        case SET_AUTH:
            return{
                // get user data from payload
                user:action.payload
            }
        case CLEAR_AUTH:
            // reset user data  
            return initState;
        default:
            // user data base on data in current state
            return state;
    }
}