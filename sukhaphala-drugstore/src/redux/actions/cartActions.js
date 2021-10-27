import axios from 'axios'

//Cart constant actions
export const GET_CART = "GET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";
export const UPDATE_SUB_CART = "UPDATE_SUB_CART";
export const DELETE_CART = "DELETE_CART";

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

// export function getCartAsync() {
//     return async function(dispatch) {
//         await axios.get("http://localhost:5000/carts/").then(res => {
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

export function add2CartAsync(aimProduct) {
    return async function(dispatch) {
        await axios.post('http://localhost:5000/carts/',aimProduct).then(res => {
            console.log(res.data)
            dispatch(add2Cart(res.data))
        })
    }
}
// test space

// test space
export const updateCart = (aimcartItem) => {

    console.log(aimcartItem);

    return {
        type: UPDATE_CART,
        payload: aimcartItem,
    }
}

export function updateCartAsync(aimcartItem) {
    return async function(dispatch) {
        await axios.put('http://localhost:5000/carts/' + aimcartItem._id, aimcartItem).then(res => {
            console.log(aimcartItem)
            console.log(res.data)
            dispatch(updateCart(res.data))
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
        await axios.put('http://localhost:5000/carts/' + aimcartItem._id, aimcartItem).then(res => {
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
        await axios.delete('http://localhost:5000/carts/' + aimcartItemDel).then(res => {
            console.log(aimcartItemDel)
            console.log(res.data)
            dispatch(deleteFromCart(res.data))
        })
    }
}
// test space




