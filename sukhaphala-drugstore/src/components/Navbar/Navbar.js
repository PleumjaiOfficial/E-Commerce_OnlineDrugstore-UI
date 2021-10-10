import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

// import { IconName } from "react-icons/hi";
// https://react-icons.github.io/react-icons

import Button from "../Button/Button";

const Navbar = () => {

  const [click,setclick] = useState(false);

  const holdClick = () => setclick(!click);
  const closeMenu = () => setclick(!click);

  return(
    <nav className="navbar">
        
      {/* links */}
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    
        <li className='nav-item'>
          <NavLink  to='/Home'  
          className='nav-links'
          onClick={closeMenu}>
            <span>HOME</span>
          </NavLink>
        </li>
        
        <li className='nav-item'>
          <NavLink  to='/Shop' 
          className='nav-links'
          onClick={closeMenu}>
            <span>SHOP</span>
          </NavLink>
        </li>

      </ul>


    <div className={click ? 'nav-button active' : 'nav-button'} >
      <NavLink  to='/Login'>
        <Button
            Button_style="btn_nav"
            Button_text="LOGIN" />
      </NavLink> 

      <NavLink  to='/Register'>
        <Button
            Button_style="btn_nav"
            Button_text="REGISTER" />
      </NavLink> 
    </div>

      
      {/* burger menu bar */}
      <div className='nav-burger' onClick={holdClick}>
        <i className={click ? 'fas fa-times' : 'fa fa-bars'}></i>
      </div>

    </nav>
  )
};

export default Navbar;