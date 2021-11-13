import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
//thunk มีparameter 2 สองตัวคือ dispath กับ Getstate ไว้เก็บพวก logic asyn และ sync ที่ได้จาก API
//แล้วหลังจากนั้นจะส่งผ่าน dispatch action ใน MiddleWare ไปหา Reducer เอาไปเปลี่ยน state
import {persistStore} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension'
import { cartReducer} from "./reducers/cartReducer"; 

//Store คือที่เก็บข้อมูล ต้องมี reducer เข้ามาช่วย
import reducersPowerRanger from "./reducersPowerRanger";
const middleWares = [thunk];


export const store = createStore(
    reducersPowerRanger,  //ถ้ามี reducer อื่นค่อยเปิดใช้งาน
    // cartReducer,
    composeWithDevTools(applyMiddleware(...middleWares)),
  );

export const persistor = persistStore(store);

export default {store,persistor};

