// import React, {useEffect, useState} from 'react'
import classes from './CardAdmin.module.css'
// import Axios from 'axios';

const CardAdmin = (props) => {
  console.log(props.id)
  let textDesc

  if(props.desc.length > 50){
    textDesc = props.desc.substring(0,50);
    textDesc  = textDesc + "..."
  } else{
    textDesc = props.desc
  }

  return (
    <div className={classes["card"]}>

      <div className={classes["card-image"]}>
        <img src={props.img} />
      </div>

      <div className={classes["card-price"]}>
        <p>{props.title}</p>
        <p>{props.price} Bath </p>
      </div>

      <div className={classes["overlay"]}>
        <div className={classes["card-content"]}>
          <h2 className={classes["card-title"]}>
            <span>{props.title}</span>
          </h2>

          <p className={classes["card-desc"]}>
            {textDesc}
          </p>

          <h3> Edit </h3>

        </div>
      </div>
    </div>
  )
}

export default CardAdmin
