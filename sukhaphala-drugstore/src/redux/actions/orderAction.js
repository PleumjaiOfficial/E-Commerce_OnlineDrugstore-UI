import axios from 'axios'
export const CREATE_ORDER = "CREATE_ORDER";
export const GET_ORDER = "GET_ORDER";


export const placeOrder = (feedback) => {
    return {
        type: CREATE_ORDER,
        payload: feedback,
    }
}

export function placeOrderAsync(userProduct) {
    return async function(dispatch) {
        // post data that want to place order to database
        await axios.post('http://localhost:5000/orders/', userProduct, {withCredentials: true})
                    .then(res => {
                        dispatch(placeOrder(res.data)) //post to database success get response to state
                    })
                    .catch((error) => {
                        //post to database fail get response fail and keep previous state
                        dispatch(placeOrder({
                            type: 'FAIL',
                            message: error.response.data.message
                        }));
                    });
    }
}



