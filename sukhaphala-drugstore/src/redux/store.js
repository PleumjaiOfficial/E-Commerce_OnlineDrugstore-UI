import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk"; 
import {persistStore} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension'

// rootReducer represent all of reducer in website
import rootReducers from "./rootReducers";

/* thunk use for get login asyn and sync from API for sending action 
   in middleware with dispatch to change state*/
const middleWares = [thunk];


export const store = createStore(
    rootReducers,  
    composeWithDevTools(applyMiddleware(...middleWares)),
  );

// persister use for save state to localstorage
export const persistor = persistStore(store);

export default {store,persistor};

