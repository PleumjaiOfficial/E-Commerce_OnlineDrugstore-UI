import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import { useSelector, useDispatch} from 'react-redux';

// import { IconName } from "react-icons/hi";
// https://react-icons.github.io/react-icons
import Button from "../Button/Button";
import { getCart } from '../../redux/actions/cartActions';
import Axios from 'axios';
import Cookies from 'js-cookie';

const Navbar = () => {

   const dispatch = useDispatch();

  const [click,setclick] = useState(false);
  const holdClick = () => setclick(!click);
  // console.log(click);

  //useSelector คือ การดึง state ที่อยู่ใน redux store มา
  //cart is array of qty
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);

  //logout test
  const handleLogout = () => {
    Axios.get('http://localhost:5000/auth/logout')
    .then(res=>{
        console.log(res);
        if (res.data.type === 'SUCCESS') {
          Cookies.remove('token');
        }
    })
  }

  return(
    <nav className={classes["navbar"]}>
        
      {/* links */}
      <ul className={classes[click ? "nav-menu-active" : "nav-menu"]}>
                    
        <li className={classes["nav-item"]}>
          <NavLink  to='/Home'  
          className={classes["nav-links"]}>
            <span>HOME</span>
          </NavLink>
        </li>
        
        <li className={classes["nav-item"]}>
          <NavLink  to='/Shop' 
          className={classes["nav-links"]}>
            <span>SHOP</span>
          </NavLink>
        </li>

        <li className={classes["nav-item"]}>
          <NavLink  to='/AdminCreateProduct' 
          className={classes["nav-links"]}>
            <span>ADD PRODUCT</span>
          </NavLink>
        </li>

      </ul>

    <div className={classes[click ? "nav-button-active" : "nav-button"]}>

    <NavLink  to='/AdminShop'>
      <span>
        <i class="fas fa-poo"></i>
      </span>
     </NavLink>

      <NavLink  to='/Cart'>
        <span>
          <i class="fas fa-shopping-cart"></i>
          {/* Ref: .reduce() https://medium.com/@thejasonfile/the-redux-reducers-and-reduce-puzzle-ecc935191fbf */}
          {/* sum start in 0 and plus with item.amount*/}
          {cart.reduce((sum, current) =>  sum + current.amount, 0)}
        </span>
      </NavLink>
      
      
      <NavLink  to='/Login'>
        <Button
            Button_style={classes["btn_nav"]}
            Button_text="LOGIN" />
      </NavLink> 

      <NavLink  to='/Register'>
        <Button
            Button_style={classes["btn_nav"]}
            Button_text="REGISTER" />
      </NavLink> 
        <Button 
            Button_style={classes["btn_nav"]}
            Button_text="Logout" 
            Button_onclick={handleLogout}/>
    </div>

      
      {/* burger menu bar */}
      <div className={classes['nav-burger']} onClick={holdClick}>
        <i className={click ? 'fas fa-times' : 'fa fa-bars'}></i>
      </div>

    </nav>
  )
};

export default Navbar;