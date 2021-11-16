import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import classes from './ProductDetail.module.css';
import Axios from 'axios';
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { add2Cart, add2CartAsync, addCartError } from '../../redux/actions/cartActions'
// import Button from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
import InfoModal from '../../components/InfoModal/InfoModal';
import Footer from '../../components/Footer/Footer'
// import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetail = () => {

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [numpack, setNumpack] = useState(1);

  const [add, setAdd] = useState(false);

  //modal handler ----------------------------------------------
  const cartError = useSelector((state) => state.cart.cartError);

  const [openInfo, setOpenInfo] = useState(false);
  //info modal state
  const [infoModal, setInfoModal] = useState({
    status: '',
    title: '',
    detail: ''
  });

  const handleCloseInfo = () => {
    setOpenInfo(false);
  }

  const mount = useRef(false);
  useEffect(() => {
    if (mount.current) {
      console.log("bara1 : ")
      if (cartError.type === 'FAIL') {
        setInfoModal({
          status: 'FAIL',
          title: 'Error',
          detail: cartError.message
        });
        setOpenInfo(true);
        setAdd(false);
      }
    } else {
      mount.current = true;
      console.log("bara2 : ")
    }
    return () => {
      dispatch(addCartError({}));
    }
  }, [cartError]);

  //Loading and click
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading, cartError ]);

  const handleClick = () => {
    setLoading(true);
    setAdd(true);
    dispatch(add2CartAsync({ ...data, amount: numpack }));
  }
  console.log('loadding ' + isLoading)

  const handleNumpack = (event) => {
    setNumpack(event.target.value)
  }

  const dispatch = useDispatch();

  useEffect(() => {
    Axios.get('http://localhost:5000/products/' + id)
      .then(res => {
        console.log(res);
        setData(res.data);
      })
      .catch(err => {
        console.log(err)
      });
  }, [])
  console.log(data);

  

  // const mount = useRef(false);
  // useEffect(() => {
  //   if(mount.current) {
  //     if (cartError.type === 'FAIL') {
  //       setInfoModal({
  //         status: 'FAIL',
  //         title: 'Error',
  //         detail: cartError.message
  //       });
  //       setOpenInfo(true);
  //     }
  //   } else {
  //     mount.current = true;
  //   }
  // }, [cartError]);

  // const cart = useSelector((state) => state.cart.cart);

  // const mount = useRef(false);
  // useEffect(() => {
  //   if (mount.current) {
  //     cart.forEach(cartitem => {
  //       if (cartitem.productId === data._id) {
  //         holdAdd();
  //       }
  //     })
  //   } else {
  //     mount.current = true;
  //   }
  // }, [cart]);

  

  return (
    <>
      <Navbar/>
        <div className={classes["productdetail-container"]}>

          <div className={classes["productdetail-image"]}>
            <img src={data.image} />
          </div>

          <div className={classes["productdetail-content"]}>
            <div className={classes["content-info"]}>
              <div className={classes["info-name"]}> {data.name} </div>
              <p className={classes["info-desc"]}> {data.description} </p>

              <div className={classes["info-healthgoal"]}> 
                <p>Health Goal :</p>
                <div className={classes["healthgoal-list"]}> 
                  {data.healthGoal} 
                </div>

              </div>
            </div>
            
            <div className={classes["content-buy"]}>
              <div className={classes["buy-price"]}>
                <p>Price :</p>
                <div className={classes["price-value"]}>{data.price}</div>
                <div className={classes["price-unit"]}>Bath</div>
              </div>

              <div className={classes["buy-qty"]}>
                <p>Amount :</p>
                <select onChange={handleNumpack} value={numpack}>
                    <option >1</option>
                    <option >2</option>
                    <option >3</option>
                    <option >4</option>
                </select>
                <div className={classes["buy-unit"]}>Pack</div>
              </div>
            </div>

						{/* <button className={classes["btn"]} onClick={() => 
							dispatch(add2CartAsync({ ...data, amount: numpack }))}>
                Add to cart
            </button>			 */}
            

            <div className={classes["content-add-cart"]}>
              { add === false ?
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  fullWidth={true} 
                  onClick={handleClick}
                  disabled={isLoading}>
                  {isLoading ? "Loading…" : "Add to cart"}
                </Button>:
                <Button
                  disabled>
                  Added cart
                </Button>
              }
            </div>
          </div>
				</div>

			<Footer />

      <InfoModal
          open={openInfo}
          onClose={handleCloseInfo}
          status={infoModal.status}
          title={infoModal.title}
          detail={infoModal.detail}
          buttonText='OK'
          buttonAction={handleCloseInfo}
        />
    </>
  )
}

export default ProductDetail;
