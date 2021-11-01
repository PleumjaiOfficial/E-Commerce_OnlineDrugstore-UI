import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import Navbar from '../../../components/Navbar/Navbar';
import axios from 'axios';
import classes from './AdminEditShop.module.css'

export const AdminEditShop = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    
    useEffect(()=>{
        axios.get('http://localhost:5000/products/' + id)
        .then(res=>{
            console.log(res);
            setData(res.data);
            setProduct(res.data)
        })
        .catch(err =>{
            console.log(err)
        });
    },[])
    console.log(data);
    console.log(product);

    // //fix
    // const [product,setProduct] = useState({
    //     ProductName: data.name,
    //     // file: {
    //     //     name: data.file.name,
    //     //     data: data.file.data,
    //     // },
    //     ProductDesc: data.description,
    //     Price: data.price,
    //     Remaining:data.remain,
    //     HealthGoal:data.healthGoal
    // })

    // console.log(product)


    async function delProduct() {
        try{
            const res = await axios.delete('http://localhost:5000/products/' + id)
            console.log(res)
        } catch(err) {
            console.log(err)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        async function updateProduct() {
        try{
            const res = await axios.put('http://localhost:5000/products/' + id,
               {
                "name": product.ProductName,
                "description": product.ProductDesc,
                "price":product.Price,
                "remain":product.Remaining,
                "healthGoal":product.HealthGoal
            })
            console.log(res)
            } catch(err) {
                console.log(err)
            }
        }
        updateProduct(); 
    }

    const resetInput = (e) => {
        e.target.value = "";
    }

    // const [imagePreview,SetimagePreview] = useState(null);
    // const handleUploadImage = (e) => {
    //     const file = e.target.files[0]
    //     console.log(e)
    //     console.log(file)
    //         //Keep name
    //         console.log(file.name)
    //         //Keep file
    //         console.log(file.type)

    //         const reader = new FileReader();
    //         reader.onloadend = (readerEvent) => { 
    //             let binaryString = readerEvent.target.result
    //             console.log(readerEvent.target)
    //             console.log(btoa(binaryString))
                
    //             setData({...data,
    //                 file:{
    //                     name: file.name,
    //                     data: btoa(binaryString)
    //                 }
    //             })
    //             SetimagePreview(reader.result) 
    //          }
    //          reader.readAsDataURL(file)
    // }

return (
    <>
    <Navbar />
    
        <div className={classes["productdetail-container"]}>
        <form onSubmit={handleSubmit}>    

            <div className={classes["create-img"]}>
                <img src={data.image} />
                    {/* <img src={imagePreview ? imagePreview : data.image }/>
                    <input 
                        type="file"
                        onChange={handleUploadImage}
                    /> */}
            </div>

            <div className={classes["create-formgroup"]}>
                <label for="Name"><h3>Product Name:</h3></label>
                <input type="text" name="Name" id="Name"
                        className={classes["create-formgroup-name"]}
                        placeholder="Product Name:"
                        value={product.ProductName}
                        onFocus={(e) => resetInput(e)}
                        onChange={e => setProduct({...product, ProductName: e.target.value})} 
                    />
            </div>

            <div className={classes["create-formgroup"]}>
                <label for="Description"><h3>Product Description:</h3></label>
                <input type="text" name="Description" id="Description"
                        className={classes["create-formgroup-description"]}
                        placeholder="Product Description:"
                        value={data.description}
                        onFocus={(e) => resetInput(e)}
                        onChange={e => setProduct({...product, ProductDesc: e.target.value})} 
                    />
            </div>

             <div className={classes["create-formgroup"]}>
                <label for="Price">Price:</label>
                 <input type="number" name="Price" id="Price"
                        className={classes["create-formgroup-price"]}
                        placeholder="Price:"
                        value={data.price}
                        onFocus={(e) => resetInput(e)}
                        onChange={e => setProduct({...product, Price: parseInt(e.target.value)})} 
                    />
                <span>Bath</span>
            </div>

            <div className={classes["create-formgroup"]}>
                <label for="Remain">Product Remaining:</label>
                <input type="text" name="Remain" id="Remain"
                        className={classes["create-formgroup-remain"]}
                        placeholder="Remain:"
                        value={data.remain}
                        onFocus={(e) => resetInput(e)}
                        onChange={e => setProduct({...product, Remaining: e.target.value})} 
                />
                <span>Package</span>
            </div>


            <div className={classes["create-formgroup"]}>
                {/* <div className={classes["create-formgroup-heathgoal"]}>  */}
                    <span>Add heathgoal</span>

                    <select  onChange={e => setProduct({...product, HealthGoal:e.target.value})} >
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
                    {data.healthGoal}
                {/* </div> */}
            </div>
            
            <div className={classes["create-formgroup"]}>
                <button className={classes["cancel"]} >cancel</button>
                <button type='submit' className={classes["save"]} >save</button>
                <button onClick={delProduct} className={classes["btn"]}>Remove</button>
            </div>

        </form>
        </div>
    </>
    )
}

export default AdminEditShop;
