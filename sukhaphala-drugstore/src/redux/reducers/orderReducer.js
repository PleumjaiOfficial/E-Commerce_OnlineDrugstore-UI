import {CREATE_ORDER } from "../actions/orderAction";


const iniState = {
    order: [],
};

export const orderReducer = (state = iniState, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            // let currentOrder;
            // // let feedback = action.payload;

            // if(action.payload === "signal"){
            //     currentOrder = iniState;
            // } else{
            //     currentOrder = state;
            // }

            // return {
            //     ...state,
            //     order:currentOrder
            // }; 
            return {
                order: action.payload
            }
        default:
            return state;
    }

}
