// import React, {useEffect, useState} from 'react'
import classes from './Card.module.css';
// import Axios from 'axios';

const Card = (props) => {

    
    console.log(props.id)
    return (
        <div className={classes["card"]}>

                <div className={classes["card-image"]}>
                        <img src={props.img} />
                        {/* <img src="https://miro.medium.com/max/1400/1*XaU1wjTJK4ZYI8yI_SFuTg.png" /> */}
                </div>

                <h2 className={classes["card-price"]}>
                    <span>{props.title}</span>
                    <span>{props.price} Bath </span>
                </h2>


                <div className={classes["overlay"]}>
                    <div className={classes["card-content"]}>
                        <h2 className={classes["card-title"]}>
                            <span>{props.title}</span>
                        </h2>
                            
                        <p className={classes["card-desc"]}>
                            {props.desc}
                        </p>

                        <h3> Expore more... </h3>
                        {/* <h3>on left eye icon can open</h3>
                        <h3>on right chart icon can ปรื้นๆ</h3> */}

                    </div>
                </div>
        </div>
    )
}

export default Card
