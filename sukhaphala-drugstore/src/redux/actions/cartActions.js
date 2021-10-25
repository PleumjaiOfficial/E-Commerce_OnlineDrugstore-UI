//Cart constant actions
export const ADD_TO_CART = "ADD_TO_CART";
export const SUB_FROM_CART = "SUB_FROM_CART";
export const DELETE_CART = "DELETE_CART";

//type is action
//payload คือ object อะไรสักอย่างทื่จะเอาเข้าไป



export const add2Cart = (aimProduct) => {
    return {
        type: ADD_TO_CART,
        payload: aimProduct,
    }
}

export const subFromCart = (aimProduct) => {
    return {
        type: SUB_FROM_CART,
        payload: aimProduct,
    }
}

export const deleteFromCart = (id) => {
    return {
        type: DELETE_CART ,
        payload: id, //id that product want to delete
    }
}


