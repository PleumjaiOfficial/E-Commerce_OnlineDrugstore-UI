import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import { useSelector, useDispatch} from 'react-redux';

// import { IconName } from "react-icons/hi";
// https://react-icons.github.io/react-icons
import Button from "../Button/Button";
import { getCart } from '../../redux/actions/cartActions';
import Axios from 'axios';
import Cookies, { set } from 'js-cookie';
import { clearAuth } from '../../redux/actions/authenAction';
import handleLogout from '../InfoModal/handleLogout/handleLogout';

const Navbar = () => {

  const dispatch = useDispatch();

  const [click,setclick] = useState(false);
  const holdClick = () => setclick(!click);


  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);

  /*
    1.เริ่มเข้าเว็บ  guest-true admin-false user-false
    2.เข้าในฐานะ admin : admin-true guest-false user-false
    2.เข้าในฐานะ user : user-true admin-false guest-false 

  */

  /*
    Guest's view: Home, Shop, Login, Register
    User's view: Home, Shop, Cart, Logout
    Admin's view: Home, Edit Product, Add Product, Logout 
  */
  // const [isGuest,setIsGuest] = useState(true);
  // const [isAdmin,setIsAdmin] = useState(false);
  // const [isUser,setIsUser] = useState(false);
  //role includes [GUEST, ADMIN, USER]
  const [role, setRole] = useState('GUEST');
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (user.isAdmin) {
      setRole('ADMIN');
    } else if (user.id) {
      setRole('USER');
    } else {
      setRole('GUEST');
    }
  }, [user]);

  return(
    <nav className={classes["navbar"]}>

      <ul className={classes[click ? "nav-menu-active" : "nav-menu"]}>

        {(role === 'GUEST' || role === 'USER') &&             
        <li className={classes["nav-item"]}>
          <NavLink  to='/Home'  
          className={classes["nav-links"]}>
            <span>HOME</span>
          </NavLink>
          </li> }
        
        {(role === 'GUEST' || role === 'USER') && 
        <li className={classes["nav-item"]}>
          <NavLink  to='/Shop' 
          className={classes["nav-links"]}>
            <span>SHOP</span>
          </NavLink>
        </li>}

        {role === 'ADMIN' && 
        <li className={classes["nav-item"]}>
          <NavLink  to='/Shop' 
          className={classes["nav-links"]}>
            <span>SHOP</span>
          </NavLink>
        </li> }

        {role === 'ADMIN' && 
        <li className={classes["nav-item"]}>
          <NavLink  to='/AdminCreateProduct' 
          className={classes["nav-links"]}>
            <span>ADD PRODUCT</span>
          </NavLink>
        </li> }

        {role === 'ADMIN' && 
         <li className={classes["nav-item"]}>
          <NavLink  to='/AdminShop'
          className={classes["nav-links"]}>
          <span>
            <span>MANAGE PRODUCT</span>
          </span>
          </NavLink> 
        </li> }

      </ul>

    <div className={classes[click ? "nav-button-active" : "nav-button"]}>

      {role === 'USER' &&
      <NavLink  to='/Cart'>
        <span>
          <i class="fas fa-shopping-cart"></i>
          {cart.reduce((sum, current) =>  sum + current.amount, 0)}
        </span>
      </NavLink> }
      
      {role === 'GUEST' && 
      <NavLink  to='/Login'>
        <Button
            Button_style={classes["btn_nav"]}
            Button_text="LOGIN" />
      </NavLink> }
      
      { role === 'GUEST' && 
      <NavLink  to='/Register'>
        <Button
            Button_style={classes["btn_nav"]}
            Button_text="REGISTER" />
      </NavLink> }
      
      { (role === 'USER' || role === 'ADMIN') && 
      <NavLink to='/Home'>
        <Button 
          Button_style={classes["btn_nav"]}
          Button_text="Logout" 
          Button_onclick={handleLogout} />
      </NavLink> }
    </div>

      
      <div className={classes['nav-burger']} onClick={holdClick}>
        <i className={click ? 'fas fa-times' : 'fa fa-bars'}></i>
      </div>

    </nav>
  )
};

export default Navbar;