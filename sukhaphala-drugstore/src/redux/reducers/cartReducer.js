import {ADD_TO_CART,DELETE_CART,GET_CART,UPDATE_ADD_CART,UPDATE_SUB_CART, ADD_TO_CART_ERROR,CLEAR_CART} from '../actions/cartActions';
import {CREATE_ORDER } from "../actions/orderAction";

const iniState = {
    // cart and error cart must emply in first state
    cart: [],
    cartError: {}
};

export const cartReducer = (state = iniState , action) => {
    switch(action.type){
        case GET_CART:
            return {
                ...state,
                cart: action.payload
            };

        case ADD_TO_CART:

            let addCart;
            const sameAddProduct = state.cart.find( (product) => product._id === action.payload._id);

            // if different product overwirte product on cart
            if (!sameAddProduct) {
                addCart = [...state.cart, action.payload];
            }

            // if same product
            else {
                let updatedCart = { ...sameAddProduct, amount: action.payload.amount }
                // map product and overwite new amount with update value 
                addCart = state.cart.map( cart => updatedCart.productId === cart.productId ? updatedCart : cart);
            }

            return {
                 //overwrite state
                ...state,
                cart: addCart
            }

        case UPDATE_ADD_CART:

            let updateCart; 
            // use find to search product that want to update
            const sameProduct = state.cart.find( (product) => product._id === action.payload._id);

            // if different product add new product
            if(!sameProduct){
                updateCart = [...state.cart, action.payload];
            }

            // if same product change only amount 
            else{
                updateCart = state.cart.map( (product) => ({
                    ...product, 
                    amount: product._id === sameProduct._id ? product.amount + 1 : product.amount
                }))
            }
            

            return {
                ...state,
                //overwrite with updateState
                cart: updateCart 
            }

        case UPDATE_SUB_CART:

            let subCart = state.cart.map( (product) => ({
                ...product, 
                 // if same product change only amount 
                amount: product._id === action.payload._id ?  product.amount - 1 : product.amount
                })
            )

            // minimun amount of product is 1, if equal or less than equrt fiter that product out
            subCart = subCart.filter((product) => product.amount > 0)

            return {
                ...state,
                //overwrite with updateState
                cart: subCart 
            }


        case DELETE_CART:

            // filter keep only product that don't want delete
            let deleteCart = state.cart.filter( (product) => product._id !== action.payload.cartId)    

            return {
                ...state,
                cart: deleteCart  
            }

        case CREATE_ORDER:
            if(action.payload.type !== "FAIL"){
                // after placeorder cart will reset
                return {
                    cart: [] 
                    }
            }else{
                return state;
            }
        
        case ADD_TO_CART_ERROR:
            return {
                ...state,
                cartError: action.payload
            }
        
        case CLEAR_CART:
            return iniState;

        default:
            //GET_CART
            return state;

    }

}