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
  const [isGuest,setIsGuest] = useState(true);
  const [isAdmin,setIsAdmin] = useState(false);
  const [isUser,setIsUser] = useState(false);
  const user = useSelector((state) => state.auth.user)
  // console.log(user);

  useEffect(() => {
    if (user.isAdmin === true) //Login is Admmin
    {
      setIsAdmin(true)
      setIsGuest(false)
      setIsUser(false) 
    } 
    else if(isGuest === true)
    {
      setIsGuest(true)
      setIsAdmin(false)
      setIsUser(false)
    }
    else{
      setIsUser(true)
      setIsAdmin(false)
      setIsGuest(false)
      }

  }, [user]);

  return(
    <nav className={classes["navbar"]}>
      {isAdmin ? 
        <>
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

            <NavLink to='/Home'>
              <Button 
                Button_style={classes["btn_nav"]}
                Button_text="Logout" 
                Button_onclick={handleLogout} />
            </NavLink>
          </div>

          {/* burger menu bar */}
          <div className={classes['nav-burger']} onClick={holdClick}>
            <i className={click ? 'fas fa-times' : 'fa fa-bars'}></i>
          </div>
      </>

    :

      <>  
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
        </ul>

        <div className={classes[click ? "nav-button-active" : "nav-button"]}>

          <NavLink  to='/Cart'>
            <span>
              <i class="fas fa-shopping-cart"></i>
              {/* Ref: .reduce() https://medium.com/@thejasonfile/the-redux-reducers-and-reduce-puzzle-ecc935191fbf */}
              {/* sum start in 0 and plus with item.amount*/}
              {cart.reduce((sum, current) =>  sum + current.amount, 0)}
            </span>
          </NavLink>

          {isGuest ?
            <NavLink  to='/Login'>
            <Button
                Button_style={classes["btn_nav"]}
                Button_text="LOGIN" />
            </NavLink> 
            :
            // <NavLink  to='/Login'>
            <Button
                Button_style={classes["btn_nav"]}
                Button_text="Profile" 
            />
            // </NavLink>
            }

          <NavLink to='/Home'>
            <Button 
              Button_style={classes["btn_nav"]}
              Button_text="Logout" 
              Button_onclick={handleLogout} />
          </NavLink>
        </div>

        {/* burger menu bar */}
        <div className={classes['nav-burger']} onClick={holdClick}>
          <i className={click ? 'fas fa-times' : 'fa fa-bars'}></i>
        </div>
      </>

    }
        

      {/* <ul className={classes[click ? "nav-menu-active" : "nav-menu"]}>
                    
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

      <NavLink to='/Home'>
        <Button 
          Button_style={classes["btn_nav"]}
          Button_text="Logout" 
          Button_onclick={handleLogout} />
      </NavLink>
    </div>

      
      <div className={classes['nav-burger']} onClick={holdClick}>
        <i className={click ? 'fas fa-times' : 'fa fa-bars'}></i>
      </div> */}

    </nav>
  )
};

export default Navbar;