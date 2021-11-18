import React from 'react'
import classes from './Footer.module.css';
import {AiOutlineCopyright, AiFillFacebook, AiFillTwitterSquare, AiFillInstagram} from 'react-icons/ai';

const Footer = () => {
  return (
      <div className={classes["footer"]}>
          <div className={classes["footer-left"]}>
            <div className={classes["foot-header"]}>SUKhaphala</div>
            <div className={classes["details"]}>Term of services</div>
            <div className={classes["copyright"]}>
              <AiOutlineCopyright />
              <det className={classes["details"]}>   2021 SUKhaphala. All rights reserved.</det>
            </div>
          </div>
          <div className={classes["footer-right"]}>
            <con className={classes["contact"]}>Contact Us</con>
            <det className={classes["details"]}>sukha@phala.com</det>
            <det className={classes["details"]}>+66 88 12345678 </det>
            <div className={classes["social"]}>
              <div className={classes["facebook"]}>
                <AiFillFacebook />
              </div>
              <div className={classes["twiiter"]}>
                <AiFillTwitterSquare />
              </div>
              <div className={classes["instragram"]}>
                <AiFillInstagram/>
              </div>
            </div>
          </div>
      </div>
  )
}

export default Footer;

