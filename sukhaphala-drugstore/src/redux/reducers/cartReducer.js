import {ADD_TO_CART,SUB_FROM_CART,DELETE_CART } from '../actions/cartActions';


const iniState = {
    cart: [],
};

export const cartReducer = (state = iniState , action) => {
    switch(action.type){
        case ADD_TO_CART:

            let addCart; //ภายใน return แต่ละ case จะต้องเป็น state ใหม่ต้องใช้ let ...state คือ copy อันเดิมแล้วแทนที่ด้วยอันใหม่ได้จาก action อยํู่ใย payload
            let newItem = action.payload;
            const sameProduct = state.cart.find( (product) => product._id === newItem._id);

            //ถ้าของคนละอย่างก็ add เข้ามาปกติ
            if(!sameProduct){
                addCart = [...state.cart, newItem];
            }

            //ถ้าของอย่างเดียวกัน 
            else{
                addCart = state.cart.map( (product) => ({
                    ...product, //overwrite ค่าเดิม
                    //ถ้าเป็น id เดียวกันเปลี่ยนแค่จำนวน ถ้าไม่ใช่ id เดียวกันเป็นจำนวนเดิม
                    amount: product._id === sameProduct._id ? product.amount + 1 : product.amount
                }))
            }

            return {
                ...state,
                cart: addCart //overwrite with updateState
            }
        
        case SUB_FROM_CART:
            
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

            //เลือกเอาเฉพาะที่ยังอยู๋เป็นอันที่ไม่ตรงกับอันที่กด
            let deleteCart = state.cart.filter( (product) => product._id !== byebyeItem)    

            return {
                ...state,
                cart: deleteCart  
            }


        default:
            return state;

    }

}