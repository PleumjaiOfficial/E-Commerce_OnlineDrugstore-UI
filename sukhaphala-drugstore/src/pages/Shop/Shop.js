import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import image from '../../image/HeaderBackground.jpg';
import Sidebar from '../../components/Sidebar/Sidebar';
import Product from '../../components/Product/Product';
import classes from './Shop.module.css'
import Footer from '../../components/Footer/Footer';
import { getCart } from '../../redux/actions/cartActions';

const Shop = () => {

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  //get data on cart if user didn't place order
  useEffect(() => {
      axios.get("http://localhost:5000/carts/" + user.id, {withCredentials: true} )
      .then(res => {
        dispatch(getCart(res.data ))
      })
  },[])

  //state for data
  const [data, setData] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/products')
    .then(res=>{
        // get only product in stock
        setData(res.data.filter(selectData => selectData.remain>0)) 
    })
   .catch(err =>{
    });
  },[])

  return (
    <>
      <Navbar />
      <div className={classes["shop-title"]}>
        <img src={image} className={classes["background-img"]} />
        <div className={classes["title-info"]}>
          <h1>More Healthy More Happy </h1>
          <p>Vitamins, protein, and more, made from the best ingredients on earth and personalized just for you.</p>
          <p>NO TIME TO DIE, Adjust your delivery or cancel at any time.</p>
        </div>
      </div>

      <div className={classes["shop-container"]}>
        <div className={classes["sidebar"]}>
          <Sidebar />
        </div>
        <div className={classes["shop-product"]}>
          {
            data.map(i=>(
              <Product 
                id={i._id}
                title={i.name}
                price={i.price}
                img={i.image}
                desc={i.description}
              />
            ))
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Shop;