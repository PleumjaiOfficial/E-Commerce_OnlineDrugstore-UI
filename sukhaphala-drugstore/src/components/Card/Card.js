import React from 'react'
import './Card.css';

const Card = (props) => {
    return (
        <div className="Card">
            <div className="Card_body">
                    <img src={props.img} />
                    <h2 className="Card_title">
                        วัยรุ้นทำไรอะ
                    </h2>
                    
                    <p className="Card_desc">
                        ทำยาก้าบบบบ
                    </p>

            </div>
            
        </div>
    )
}

export default Card
