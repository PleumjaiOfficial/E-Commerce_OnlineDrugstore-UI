import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import Navbar from '../../../components/Navbar/Navbar';
import Axios from 'axios';
import classes from './AdminEditShop.module.css'

export const AdminEditShop = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);

    
    useEffect(()=>{
        Axios.get('http://localhost:5000/products/' + id)
        .then(res=>{
            console.log(res);
            setData(res.data);
        })
        .catch(err =>{
            console.log(err)
        });
    },[])
    console.log(data);

return (
    <>
    <Navbar />
    
        <div className={classes["productdetail-container"]}>

            <div className={classes["create-img"]}>
                <button>Edit image</button>
                <img src={data.image} />
            
            </div>

            <div className={classes["create-formgroup"]}>
                <label for="Name"><h3>Product Name:</h3></label>
                {data.name}
                <button>EDIT</button>
            </div>

            <div className={classes["create-formgroup"]}>
                <label for="Description"><h3>Product Description:</h3></label>
                {data.description}
                <button>EDIT</button>
            </div>

             <div className={classes["create-formgroup"]}>
                <label for="Price">Price:</label>
                {data.price}
                <span>Bath</span>
                <button>EDIT</button>
            </div>

            <div className={classes["create-formgroup"]}>
                <label for="Remain">Product Remaining:</label>
                {data.remain}
                <span>Package</span>
                <button>EDIT</button>
            </div>


            <div className={classes["create-formgroup"]}>
                {/* <div className={classes["create-formgroup-heathgoal"]}>  */}
                    <span>Add heathgoal</span>

                    <select>
                                <option > fever </option>
                                <option > Happy </option>
                                <option > Stress </option>
                                <option > Beauty </option>
                    </select> 
                {/* </div> */}
            </div>

             <div className={classes["create-formgroup"]}>
                {/* <div className={classes["create-formgroup-heathgoal"]}>  */}
                    <span>Heathgoal: </span>
                    {data.health_goal}
                    <button>EDIT</button>
                {/* </div> */}
            </div>
            
            <div className={classes["create-formgroup"]}>
                <button className={classes["cancel"]} >cancel</button>
                <button className={classes["save"]} >save</button>
                <button className={classes["btn"]}>Remove</button>
            </div>

        </div>
    </>
    )
}

export default AdminEditShop;
