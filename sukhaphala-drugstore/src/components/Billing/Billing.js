import React, { useEffect, useState, useRef } from 'react'
import classes from './Billing.module.css';
import Button from "../Button/Button";
import InfoModal from '../InfoModal/InfoModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useSelector,useDispatch } from 'react-redux';
import { placeOrderAsync } from '../../redux/actions/orderAction'; 

const Billing = () => {

    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);

    const order = useSelector((state) => state.order.order);

    const dispatch = useDispatch();

    //modal state of confirm modal
    const [ openConfirm, setOpenConfirm ] = useState(false);
    //modal state of informative modal
    const [ openInfo, setOpenInfo ] = useState(false);
    //info modal state
    const [ infoModal, setInfoModal ] = useState({
        status: '',
        title: '',
        detail: ''
    });
    //use this variable to track if it is the first render to prevent useeffect make the popup
    const mount = useRef(false);

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const handleOpenInfo = () => {
        if (order.type === 'FAIL') {
            setInfoModal({
                status:'FAIL',
                title: 'Error',
                detail: order.message
            });
        } else if (order._id) {
            setInfoModal({
                status:'SUCCESS',
                title: 'SUCCESS',
                detail: 'Successfully place your order!'
            });
        }
        setOpenInfo(true);
    }
    const handleCloseInfo = () => {
        setOpenInfo(false);
    }

    const handleOrder = () => {
        setOpenConfirm(true);
    }

    const handlePlaceOrder = (cart) => {
        dispatch(placeOrderAsync(cart));
    }

    useEffect(() => {
        if (mount.current) {
            setOpenConfirm(false);
            handleOpenInfo();
        } else {
            mount.current = true;
        }
    }, [order]);

    return (
        <div>
            <div className={classes["billing"]}>
                <div className={classes["biling-topic"]}>
                    <h1>Billing</h1>
                    <h2>Order summary</h2>
                </div>

                <h3 className={classes["billing-user"]}>
                    <span>User : </span>
                    <span>Ryo Wong</span>
                </h3>

                <h3 className={classes["billing-subtotal"]}>
                    <span>Contact : </span>
                    <span>บ่ฮู้</span>

                </h3>

                <h3 className={classes["billing-tax"]}>
                    <span>Adress : </span>
                    <span>บ่ฮู้</span>
                </h3>

                <h3 className={classes["billing-total"]}>
                    <span>Total :</span>
                    <span>
                        {cart.reduce((sum, current) =>  sum + (current.price*current.amount), 0)} Bath
                    </span>
                </h3>

                <Button
                    Button_style={classes["btn_cart"]}
                    Button_text="Place order" 
                    // Button_onclick={()=> dispatch(placeOrderAsync(cart))}
                    Button_onclick={handleOrder}
                />

            </div>

            <ConfirmModal 
                open={openConfirm} 
                onClose={handleCloseConfirm}
                title='Are you sure?'
                detail='Press confirm to continue place order'
                buttonConfirmText='Confirm'
                buttonCancelText='Cancel'
                buttonConfirm={ () => handlePlaceOrder(cart)}
                buttonCancel={handleCloseConfirm}
            />

            <InfoModal 
                open={openInfo} 
                onClose={handleCloseInfo}
                status={infoModal.status}
                title={infoModal.title}
                detail={infoModal.detail}
                buttonText='OK'
                buttonAction={handleCloseInfo}
            />
        </div>
    )
}

export default Billing
