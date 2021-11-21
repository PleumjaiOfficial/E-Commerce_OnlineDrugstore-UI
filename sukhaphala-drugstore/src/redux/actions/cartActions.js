import axios from 'axios'

export const GET_CART = "GET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_ADD_CART = "UPDATE_CART";
export const UPDATE_SUB_CART = "UPDATE_SUB_CART";
export const DELETE_CART = "DELETE_CART";
export const ADD_TO_CART_ERROR = "ADD_TO_CART_ERROR";
export const CLEAR_CART = "CLEAR_CART"

export const getCart = (selectedProduct) => {
    return {
        type: GET_CART,
        payload: selectedProduct,
    }
}

export const add2Cart = (aimProduct) => {
    return {
        type: ADD_TO_CART,
        payload: aimProduct,
    }
}

export const addCartError = (error) => {
    return {
        type: ADD_TO_CART_ERROR,
        payload: error
    }
}

export function add2CartAsync(aimProduct) {

    /*
        post product that want to add to database
        if add success use action to add data to cart state
        if error response to payload and present with modal
    */

    return async function(dispatch) {
        await axios.post('http://localhost:5000/carts/',aimProduct, {withCredentials: true})
        .then(res => {
            dispatch(add2Cart(res.data))
        })
        .catch(error => {
            dispatch(addCartError(error.response.data));
        })
    }
}

export const updateAddCart = (selectedProduct) => {
    return {
        type: UPDATE_ADD_CART,
        payload: selectedProduct,
    }
}

export function updateAddCartAsync(aimcartItem) {

     /*
        put cart that wanted to update to database
        and keep new data to change in cart
    */

    return async function(dispatch) {
        await axios.put('http://localhost:5000/carts/' + aimcartItem._id, aimcartItem, {withCredentials: true})
        .then(res => {
            dispatch(updateAddCart(res.data))
        })
    }
}

// test space
export const updateSubCart = (selectedProduct) => {

    console.log(selectedProduct);

    return {
        type: UPDATE_SUB_CART,
        payload: selectedProduct,
    }
}

export function updateSubCartAsync(aimcartItem) {

    /*
        put cart that wanted to update to database
        and keep new data to change in cart
    */
    
    return async function(dispatch) {
        await axios.put('http://localhost:5000/carts/' + aimcartItem._id, aimcartItem , {withCredentials: true})
        .then(res => {
            dispatch(updateSubCart(res.data))
        })
    }
}

export const deleteFromCart = (id) => {
    return {
        type: DELETE_CART,
        payload: id, //id that product want to delete
    }
}

export function deleteFromCartAsync(aimcartItemDel) {
    // sent selecred product that want to delete to database
    return async function(dispatch) {
        await axios.delete('http://localhost:5000/carts/' + aimcartItemDel , {withCredentials: true})
        .then(res => {
            dispatch(deleteFromCart(res.data))
        })
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    };
}



