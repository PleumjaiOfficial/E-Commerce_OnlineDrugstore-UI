import React, { useEffect, useRef, useState } from 'react'
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Navbar from '../../components/Navbar/Navbar';
import InfoModal from '../../components/InfoModal/InfoModal';
import Footer from '../../components/Footer/Footer'
import HealthGoalsList from '../../components/HealthGoalList/HealthGoalList';
import { add2CartAsync, addCartError } from '../../redux/actions/cartActions'
import classes from './ProductDetail.module.css';

const ProductDetail = () => {

  //useParam to get product that user want to explore the detail
  const { id } = useParams(); 

  //state for healthGoal
  const [data, setData] = useState({
    healthGoal: []
  });

  //state for get multiple product
  const [numpack, setNumpack] = useState(1);
  const [add, setAdd] = useState(false);

  //modal handler 
  const cartError = useSelector((state) => state.carts.cartError);
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
    }
  }, [cartError]);

  //if fail to add to cart then reset cartError
  useEffect(() => {
    if (add === false) {
      dispatch(addCartError({}));
    }
  }, [add]);

  //Loading and click
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => { //if loading not finish yet, setLoading is logic true
        setLoading(false); //Loading finish
      });
      setAdd(true);
    }
  }, [isLoading]);

  const handleClick = () => {
    setLoading(true);
    dispatch(add2CartAsync({ ...data, amount: numpack })); //overwrite data if use get product more than one
  }

  const handleNumpack = (event) => {
    setNumpack( + event.target.value )
  }

  const dispatch = useDispatch();
  useEffect(() => {
    Axios.get('http://localhost:5000/products/' + id) //get data product that same id that get from useParam
      .then(res => {
        setData(res.data); 
      })
      .catch(err => {
        console.log(err)
      });
  }, [])


  

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
                  
                  <HealthGoalsList 
                    healthGoals = {data.healthGoal}
                  />
                </div>

              </div>
            </div>
            
            <div className={classes["content-buy"]}>
              <div className={classes["buy-price"]}>
                <p>Price :</p>
                <div className={classes["price-value"]}>{data.price}</div>
                <div className={classes["price-unit"]}>Bath</div>
              </div>

              <div className={classes["remain"]}>
                <p>Remain :</p>
                <div className={classes["remain-value"]}>{data.remain}</div>
                <div className={classes["remain-unit"]}>pack</div>
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
