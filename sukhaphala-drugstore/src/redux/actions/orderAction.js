import axios from 'axios'
export const CREATE_ORDER = "CREATE_ORDER";


export const placeOrder = (feedback) => {
    console.log(feedback);

    return {
        type: CREATE_ORDER,
        payload: feedback,
    }
}

export function placeOrderAsync(userProduct) {

    console.log(userProduct);
    return async function(dispatch) {
        await axios.post('http://localhost:5000/orders/', userProduct, {withCredentials: true})
                    .then(res => {
                        console.log(res.data)
                        dispatch(placeOrder(res.data))
                    })
                    .catch((error) => {
                        console.log('บ่ถูก');
                        dispatch(placeOrder({
                            type: 'FAIL',
                            message: 'fail to place this order, please try again later'
                        }));
                    });
                    // .catch((error) => alert('บ่ถูก'))
    }
}

