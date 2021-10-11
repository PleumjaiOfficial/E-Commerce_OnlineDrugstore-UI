import React from 'react'
import classes from './Card.module.css';

const Card = (props) => {
    return (
        <div className={classes["card"]}>
            <div className={classes["card_body"]}>
                    <img src={props.img} />
                    <h2 className={classes["card_title"]}>
                        วัยรุ้นทำไรอะ
                    </h2>
                    
                    <p className={classes["card_desc"]}>
                        ทำยาก้าบบบบ
                    </p>

            </div>
            
        </div>
    )
}

export default Card
