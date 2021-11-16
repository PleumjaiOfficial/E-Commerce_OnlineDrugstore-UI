//เอาไว้รวม reducer
import { combineReducers } from "redux";
import { authenReducer } from "./reducers/authenReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key:'root',
    storage,
    whitelist: ['auth'] //what resucer what to save
}

const reducersPowerRanger = combineReducers({   
    cart: cartReducer, // {cart : {cart: [] } }
    auth: authenReducer, // auth: {user : []} 
    order: orderReducer
});

export default persistReducer(persistConfig,reducersPowerRanger);


// export const reducersPowerRanger = combineReducers({
//     cart: cartReducer, // {cart : {cart: [] } }
//     auth: authenReducer, // auth: {user : null} 
//     order: orderReducer
// });
