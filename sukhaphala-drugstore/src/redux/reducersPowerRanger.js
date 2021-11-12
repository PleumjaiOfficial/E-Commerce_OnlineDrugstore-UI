//เอาไว้รวม reducer
import { combineReducers } from "redux";
import { authenReducer } from "./reducers/authenReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";

export const reducersPowerRanger = combineReducers({
    cart: cartReducer, // {cart : {cart: [] } }
    auth: authenReducer, // auth: {user : null} 
    order: orderReducer
});
