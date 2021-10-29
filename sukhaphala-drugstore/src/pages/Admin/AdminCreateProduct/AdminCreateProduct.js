import {useState} from 'react'
import classes from './AdminCreateProduct.module.css'
import image from '../../../image/image-default';

const AdminCreateProduct = () => {

    const [data, setData] = useState({
        // imgae:
        ProductName: '',
        ProductDesc: '',
        Price:'',
        Remaining:'',
        HealthGoal:''
    });

    return (
        <div>
            <div className={classes["create-img"]}>
                <button>Add image</button>
                <img src={image} />
            </div>

            <div className={classes["create-formgroup"]}>
                <label for="Name"><h3>Product Name:</h3></label>
                <input type="text" name="Name" id="Name"
                    className={classes["create-formgroup-name"]}
                    placeholder="Product Name:"
                    value={data.ProductName}
                    onChange={e => setData({...data, ProductName: e.target.value})} 
                />
            </div>

            <div className={classes["create-formgroup"]}>
                <label for="Description"><h3>Product Description:</h3></label>
                <input type="text" name="Description" id="Description"
                    className={classes["create-formgroup-description"]}
                    placeholder="Product Description:"
                    value={data.ProductDesc}
                    onChange={e => setData({...data, ProductDesc: e.target.value})} 
                />
            </div>

             <div className={classes["create-formgroup"]}>
                <label for="Price">Price:</label>
                <input type="text" name="Price" id="Price"
                    className={classes["create-formgroup-price"]}
                    placeholder="Price:"
                    value={data.Price}
                    onChange={e => setData({...data, Price: e.target.value})} />
                <span>Bath</span>
            </div>

            <div className={classes["create-formgroup"]}>
                <label for="Remain">Product Remaining:</label>
                <input type="text" name="Remain" id="Remain"
                    className={classes["create-formgroup-remain"]}
                    placeholder="Remain:"
                    value={data.Remaining}
                    onChange={e => setData({...data, Remaining: e.target.value})} />
                <span>Package</span>
            </div>


            <div className={classes["create-formgroup"]}>
                {/* <div className={classes["create-formgroup-heathgoal"]}>  */}
                    <span>Add heathgoal</span>

                    <select onChange={e => setData({...data, HealthGoal:e.target.value})} value={data.HealthGoal}>
                                <option > fever </option>
                                <option > Happy </option>
                                <option > Stress </option>
                                <option > Beauty </option>
                    </select> 
                {/* </div> */}
            </div>
            
            <div className={classes["create-formgroup"]}>
                <button className={classes["cancel"]} >cancel</button>
                {/* click save ปุ๊ป ก็ส่งไปยัง database */}
                <button className={classes["save"]} >save</button>
            </div>

            <p>
                {data.ProductName}  <br/>
                {data.ProductDesc}  <br/>
                {data.Price}        <br/>
                {data.Remaining}    <br/>
                {data.HealthGoal}   <br/>
            </p>
        </div>
    )
}

export default AdminCreateProduct
