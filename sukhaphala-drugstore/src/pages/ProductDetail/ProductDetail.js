import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar/Navbar';
import classes from './ProductDetail.module.css';
import Axios from 'axios';
import {NavLink, useParams} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {add2Cart, add2CartAsync} from '../../redux/actions/cartActions'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetail = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [numpack,setNumpack] = useState(1);
    
    const [add,setAdd] = useState(false);
    const holdAdd = () => setAdd(true);
    const [modalShow, setModalShow] = useState(false);

//modal    
    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Success 
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>{data.name} is on your cart </h4>
                <p>
                    Click on 'Cart button to see your product in cart
                    or Click on 'Close' shopping other products
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <NavLink  to='/Cart'><Button>Cart</Button></NavLink>
            </Modal.Footer>
            </Modal>
        );
    }
//

    //Loading and click
    function simulateNetworkRequest() {
        return new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
                holdAdd();
                setModalShow(true);
            });
        }
    }, [isLoading]);   
    const handleClick = () => setLoading(true);
    console.log('loadding ' + isLoading)
    //

    const handleNumpack = (event) => {
        setNumpack(event.target.value)
    }

    //in displace have action
    const dispatch = useDispatch();

    useEffect(()=>{
        Axios.get('http://localhost:5000/products/' + id)
        .then(res=>{
            console.log(res);
            setData(res.data);
        })
        .catch(err =>{
            console.log(err)
        });
    },[])
    console.log(data);


    return (
    <>
    <Navbar />
    
        <div className={classes["productdetail-container"]}>


            <div className={classes["productdetail-image"]}>
                <img src={data.image} />
            </div>

            <div className={classes["productdetail-content"]}>

                <h2 className={classes["productdetail-topic"]}> {data.name} </h2>
                
                <p className={classes["productdetail-desc"]}> {data.description} </p>

                <h3 className={classes["product-price"]}>
                    <span>price</span>
                    <span className={classes["product-price-value"]}>{data.price}</span>  
                    <span className={classes["product-price-unit"]}>Bath</span> 
                </h3>

                <h3 className={classes["product-qty"]}> 
                    <span>Amount</span>
                    
                    <select onChange={handleNumpack} value={numpack}>
                        <option >1</option>
                        <option >2</option>
                        <option >3</option>
                        <option >4</option>
                    </select> 
                    
                    <span product-qty-unit> pack </span>
                </h3>
                
                {add === false ? 
                    <Button 
                        className={classes["btn"]} 
                        onClick = {!isLoading ? handleClick : dispatch(add2CartAsync({...data,amount: numpack}))}
                        disabled = {isLoading}>
                                {isLoading ? "Loading…" : "Add to cart"  }
                    </Button> :
                    <Button 
                        className={classes["btn"]} 
                        disabled>
                            Added cart
                    </Button>
                }

                <MyVerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                />
                   
                
                
                
            
            </div>
        </div>
    </>
    )
}

export default ProductDetail
