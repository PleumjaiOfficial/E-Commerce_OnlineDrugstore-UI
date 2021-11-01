import {useState,useEffect} from 'react'
import Navbar from '../../../components/Navbar/Navbar';
import classes from './AdminCreateProduct.module.css'
import image from '../../../image/image-default';
import axios from 'axios';

const AdminCreateProduct = () => {

    const handleSubmit = () => {
       
        //test
        const newproduct = {
                "name": data.ProductName,
                "file": data.file,
                "description": data.ProductDesc,
                "price":data.Price,
                "remain":data.Remaining,
                "healthGoal":data.HealthGoal
            }

        console.log(newproduct)

        const CreateProduct = () => {

            axios.post('http://localhost:5000/products/',
            {
                "name": data.ProductName,
                "file": data.file,
                "description": data.ProductDesc,
                "price":data.Price,
                "remain":data.Remaining,
                "healthGoal":data.HealthGoal
            })
            .then(res => console.log(res) )
            
    }
    CreateProduct();
}

    const [data, setData] = useState({
        // initial state
        ProductName: '',

        file: {
            name: '',
            data: '',
            },

        ProductDesc: '',
        Price: '',
        Remaining: '',
        HealthGoal: ''
    });

    const [imagePreview,SetimagePreview] = useState(null);
    const handleUploadImage = (e) => {
        const file = e.target.files[0]
        console.log(e)
        console.log(file)
            //Keep name
            console.log(file.name)
            //Keep file
            console.log(file.type)

            const reader = new FileReader();
            reader.onloadend = (readerEvent) => { 
                let binaryString = readerEvent.target.result
                console.log(readerEvent.target)
                console.log(btoa(binaryString))
                
                setData({...data,
                    file:{
                        name: file.name,
                        data: btoa(binaryString)
                    }
                })

                SetimagePreview(reader.result) 
             }
             reader.readAsDataURL(file)
    }



    return (
        <div>
             <Navbar />
             {/* <form onSubmit={handleSubmit}>     */}
                <div className={classes["create-img"]}>
                    <img src={imagePreview ? imagePreview : image }/>
                    <input 
                        type="file"
                        onChange={handleUploadImage}
                    />
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
                    <input type="number" name="Price" id="Price"
                        className={classes["create-formgroup-price"]}
                        placeholder="Price:"
                        value={data.Price}
                        onChange={e => setData({...data, Price: parseInt(e.target.value)})} />
                    <span>Bath</span>
                </div>

                <div className={classes["create-formgroup"]}>
                    <label for="Remain">Product Remaining:</label>
                    <input type="number" name="Remain" id="Remain"
                        className={classes["create-formgroup-remain"]}
                        placeholder="Remain:"
                        value={data.Remaining}
                        onChange={e => setData({...data, Remaining: parseInt(e.target.value)})} />
                    <span>Package</span>
                </div>


                <div className={classes["create-formgroup"]}>
                    {/* <div className={classes["create-formgroup-heathgoal"]}>  */}
                        <span>Add heathgoal</span>

                        <select onChange={e => setData({...data, HealthGoal:e.target.value})} >
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

                    <button onClick={handleSubmit} className={classes["save"]}>
                        save
                    </button>
                </div>

            {/* </form> */}

            {/* Test space */}
            <p>
                {data.ProductName}  <br/>
                {data.ProductDesc}  <br/>
                {data.Price}        <br/>
                {data.Remaining}    <br/>
                {data.HealthGoal}   <br/>
                {data.file.name}    <br/>
                {data.file.data} <br />
            </p>
        </div>

    )
}

export default AdminCreateProduct
