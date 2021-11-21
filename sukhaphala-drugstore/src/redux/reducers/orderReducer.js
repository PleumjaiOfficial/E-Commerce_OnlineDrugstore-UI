import {CREATE_ORDER,GET_ORDER } from "../actions/orderAction";

const iniState = {
    /* 
        order must emply before connect database 
        after that if user have order, this state
        will keep that order 
    */
    order: [],
};

export const orderReducer = (state = iniState, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            return {
                order: action.payload
            }
        case GET_ORDER:
            return {
                ...state,
                order: action.payload
            };
        default:
            return state;
    }

}
