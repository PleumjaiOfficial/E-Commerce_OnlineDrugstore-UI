import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from "../Button/Button";
import handleLogout from '../../utils/handleLogout';
import classes from './Navbar.module.css';

const Navbar = () => {

  //use for responsive design (unfinish)
  const [ click, setclick ] = useState(false);
  const holdClick = () => setclick(!click);
  
  /*
    Guest's view: Home, Shop, Login, Register
    User's view: Home, Shop, Cart, Logout
    Admin's view: Home, Edit Product, Add Product, Logout 
  */
  //role includes [GUEST, ADMIN, USER]
  const [role, setRole] = useState('GUEST');

  const cart = useSelector((state) => state.carts.cart); //use to display number of product in cart of navbar
  const user = useSelector((state) => state.auth.user); //use for track the user role
  
  //set user role 
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
        {/* home link */}
        {(role === 'GUEST' || role === 'USER') &&             
        <li className={classes["nav-item"]}>
          <NavLink  to='/Home'  
          className={classes["nav-links"]}>
            <span>HOME</span>
          </NavLink>
          </li> }
        
        {/* main shopping page link */}
        {(role === 'GUEST' || role === 'USER') && 
        <li className={classes["nav-item"]}>
          <NavLink  to='/Shop' 
          className={classes["nav-links"]}>
            <span>SHOP</span>
          </NavLink>
        </li>}

        {/* create product page (for admin) */}
        {role === 'ADMIN' && 
        <li className={classes["nav-item"]}>
          <NavLink  to='/AdminCreateProduct' 
          className={classes["nav-links"]}>
            <span>ADD PRODUCT</span>
          </NavLink>
        </li> }

        {/* manage product page (for admin) */}
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
      {/* user's cart */}
      {role === 'USER' &&
      <NavLink  to='/Cart'>
        <span>
          <i class="fas fa-shopping-cart"></i>
          {cart.reduce((sum, current) =>  sum + current.amount, 0)}
        </span>
      </NavLink> }
      
      {/* login page */}
      {role === 'GUEST' && 
      <NavLink  to='/Login'>
        <Button
            Button_style={classes["btn_nav"]}
            Button_text="LOGIN" />
      </NavLink> }
      
      {/* register page */}
      { role === 'GUEST' && 
      <NavLink  to='/Register'>
        <Button
            Button_style={classes["btn_nav"]}
            Button_text="REGISTER" />
      </NavLink> }
      
      {/* home page */}
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