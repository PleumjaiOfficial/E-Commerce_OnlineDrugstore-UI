import axios from 'axios'

//Cart constant actions
export const GET_CART = "GET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";
export const UPDATE_SUB_CART = "UPDATE_SUB_CART";
export const DELETE_CART = "DELETE_CART";
export const ADD_TO_CART_ERROR = "ADD_TO_CART_ERROR";
export const CLEAR_CART = "CLEAR_CART"

// export const getCart = () => {

//     return {
//         type: GET_CART,
//         payload: axios.get("http://localhost:5000/carts/")
//     }
// }

// export const getCart = () => async dispatch => {
//     const res = await axios.get("http://localhost:5000/carts/")

//     console.log(res.data)

//     dispatch({
//         type: GET_CART,
//         payload: res.data
//     })
// }

export const getCart = (aimProduct) => {

    console.log(aimProduct);

    return {
        type: GET_CART,
        payload: aimProduct,
    }
}

// export function getCartAsync(userId) {
//     return async function(dispatch) {
//         await axios.get("http://localhost:5000/carts/" + userId).then(res => {
//             console.log(res.data)
//             dispatch(getCart(res.data))
//         })
//     }
// }

// test space
export const add2Cart = (aimProduct) => {

    console.log(aimProduct);

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
    return async function(dispatch) {
        await axios.post('http://localhost:5000/carts/',aimProduct, {withCredentials: true})
        .then(res => {
            console.log(res.data)
            dispatch(add2Cart(res.data))
        })
        .catch(error => {
            dispatch(addCartError(error.response.data));
        })
    }
}

// test space
export const updateAddCart = (aimcartItem) => {

    console.log(aimcartItem);

    return {
        type: UPDATE_CART,
        payload: aimcartItem,
    }
}

export function updateAddCartAsync(aimcartItem) {
    return async function(dispatch) {
        await axios.put('http://localhost:5000/carts/' + aimcartItem._id, aimcartItem, {withCredentials: true})
        .then(res => {
            console.log(aimcartItem)
            console.log(res.data)
            dispatch(updateAddCart(res.data))
        })
    }
}

// test space
export const updateSubCart = (aimcartItem) => {

    console.log(aimcartItem);

    return {
        type: UPDATE_SUB_CART,
        payload: aimcartItem,
    }
}

export function updateSubCartAsync(aimcartItem) {
    return async function(dispatch) {
        await axios.put('http://localhost:5000/carts/' + aimcartItem._id, aimcartItem , {withCredentials: true})
        .then(res => {
            console.log(aimcartItem)
            console.log(res.data)
            dispatch(updateSubCart(res.data))
        })
    }
}
// test space


// test space
export const deleteFromCart = (id) => {

    console.log(id);

    return {
        type: DELETE_CART ,
        payload: id, //id that product want to delete
    }
}

export function deleteFromCartAsync(aimcartItemDel) {
    return async function(dispatch) {
        await axios.delete('http://localhost:5000/carts/' + aimcartItemDel , {withCredentials: true})
        .then(res => {
            console.log(aimcartItemDel)
            console.log(res.data)
            dispatch(deleteFromCart(res.data))
        })
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    };
}



