import {ADD_TO_CART,DELETE_CART,GET_CART,UPDATE_CART,UPDATE_SUB_CART } from '../actions/cartActions';
import {CREATE_ORDER } from "../actions/orderAction";
import axios from 'axios'

const iniState = {
    cart: [],
};

export const cartReducer = (state = iniState , action) => {
    switch(action.type){
        case GET_CART:

            let myCart;
            myCart = action.payload;
             
            return {
                ...state,
                cart:myCart
            };

        case ADD_TO_CART:

            let addCart;
            // let newItem = action.payload;

            const sameAddProduct = state.cart.find( (product) => product._id === action.payload._id);

            //ของต่าง
            if (!sameAddProduct) {
                addCart = [...state.cart, action.payload];
            }

            //อันเดียวกัน
            else {
                // addCart = state.cart.map( (product) => ({
                //     ...product, //overwrite ค่าเดิม
                //      amount: action.payload.amount
                // }))
                let updatedCart = { ...sameAddProduct, amount: action.payload.amount }
                addCart = state.cart.map( cart => updatedCart.productId === cart.productId ? updatedCart : cart);
            }

            return {
                ...state,
                cart: addCart //overwrite with updateState
            }

        case UPDATE_CART:
        // case ADD_TO_CART:

            let updateCart; //ภายใน return แต่ละ case จะต้องเป็น state ใหม่ต้องใช้ let ...state คือ copy อันเดิมแล้วแทนที่ด้วยอันใหม่ได้จาก action อยํู่ใย payload
            // let newItem = action.payload;
            const sameProduct = state.cart.find( (product) => product._id === action.payload._id);

            //ถ้าของคนละอย่างก็ add เข้ามาปกติ
            if(!sameProduct){
                updateCart = [...state.cart, action.payload];
            }

            //ถ้าของอย่างเดียวกัน 
            else{
                updateCart = state.cart.map( (product) => ({
                    ...product, //overwrite ค่าเดิม
                    //ถ้าเป็น id เดียวกันเปลี่ยนแค่จำนวน ถ้าไม่ใช่ id เดียวกันเป็นจำนวนเดิม
                    amount: product._id === sameProduct._id ? product.amount + 1 : product.amount
                }))
            }
            

            return {
                ...state,
                cart: updateCart //overwrite with updateState
            }

        case UPDATE_SUB_CART:
            
            // let subCart; //ภายใน return แต่ละ case จะต้องเป็น state ใหม่ต้องใช้ let ...state คือ copy อันเดิมแล้วแทนที่ด้วยอันใหม่ได้จาก action อยํู่ใย payload
            let Item = action.payload;
            let subCart

            subCart = state.cart.map( (product) => ({
                ...product, //overwrite ค่าเดิม
                //ถ้าเป็น id เดียวกันเปลี่ยนแค่จำนวน ถ้าไม่ใช่ id เดียวกันเป็นจำนวนเดิม
                amount: product._id === Item._id ?  product.amount - 1 : product.amount
                })
            )

             subCart = subCart.filter((product) => product.amount > 0)

            return {
                ...state,
                cart: subCart //overwrite with updateState
            }


        case DELETE_CART:
            
            //https://stackoverflow.com/questions/34003553/redux-what-is-the-correct-way-to-filter-a-data-array-in-reducer
            let byebyeItem = action.payload;

            console.log(byebyeItem);

            //เลือกเอาเฉพาะของที่ยังอยู๋เป็นอันที่ไม่ตรงกับอันที่กด
            let deleteCart = state.cart.filter( (product) => product._id !== byebyeItem.cartId)    

            return {
                ...state,
                cart: deleteCart  
            }

        case CREATE_ORDER:
            
            if(action.payload.type !== "FAIL"){
                return {
                    cart: [] 
                    }
            }else{
                return state;
            }

        default:
            //GET_CART
            return state;

    }

}