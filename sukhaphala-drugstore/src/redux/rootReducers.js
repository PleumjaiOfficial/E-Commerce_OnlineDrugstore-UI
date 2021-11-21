import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { authenReducer } from "./reducers/authenReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
import { persistReducer } from "redux-persist";


const persistConfig = {
    key:'root',
    storage,
    whitelist: ['auth','carts'] //what resucer what to save
}

const rootReducers = combineReducers({   
    carts: cartReducer, //   carts : {cart: [] } 
    auth: authenReducer, // auth: {user : []} 
    orders: orderReducer //  orders: {order: []}
});

export default persistReducer(persistConfig,rootReducers);
