import { CLEAR_ORDER, CREATE_ORDER } from "../actions/orderAction";


const iniState = {
    order: [],
};

export const orderReducer = (state = iniState , action) => {
    switch (action.type) {
        case CREATE_ORDER:
            let userOrder = action.payload;
            return {order: userOrder};

        case CLEAR_ORDER:
            return {order: null};            
    
        default:
            return state;
    }

}
