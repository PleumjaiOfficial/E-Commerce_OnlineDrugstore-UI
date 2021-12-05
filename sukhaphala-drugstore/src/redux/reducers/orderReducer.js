import {CREATE_ORDER, GET_ORDER} from "../actions/orderAction";

const iniState = {
    /* 
        order must emply before placeorder
        after placeOrder by cartReducer
        cart will be reset and order will
        overwrite by payload from placeOrder 
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
            // Order that user use to place order 
            return {
                ...state,
                order: action.payload
            };

        default:
            return state;
    }

}
