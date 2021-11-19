import React from 'react'
import classes from './Footer.module.css';
import {AiOutlineCopyright, AiFillFacebook, AiFillTwitterSquare, AiFillInstagram} from 'react-icons/ai';

const Footer = () => {
  return (
      <div className={classes["footer"]}>
          <div className={classes["footer-left"]}>
            <div className={classes["foot-header"]}>SUKhaphala</div>
            <p>Term of services</p>
            <p>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
            <div className={classes["copyright"]}>
              <AiOutlineCopyright />
              <det className={classes["details"]}>   2021 SUKhaphala. All rights reserved.</det>
            </div>
          </div>
          <div className={classes["footer-right"]}>
            <con className={classes["contact"]}>Contact Us</con>
            <div className={classes["details"]}>sukha@phala.com</div>
            <div className={classes["details"]}>+66 88 12345678 </div>
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

