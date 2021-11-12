import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import classes from './ProductDetail.module.css';
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { add2Cart, add2CartAsync } from '../../redux/actions/cartActions';
import Footer from '../../components/Footer/Footer';

const ProductDetail = () => {

	const { id } = useParams();
	const [data, setData] = useState([]);
	const [numpack, setNumpack] = useState(1);

	const handleNumpack = (event) => {
		setNumpack(event.target.value)
	}

	//in displace have action
	const dispatch = useDispatch();

	useEffect(() => {
		Axios.get('http://localhost:5000/products/' + id)
			.then(res => {
				console.log(res);
				setData(res.data);
			})
			.catch(err => {
				console.log(err)
			});
	}, [])
	console.log(data);


	//object map healthgoal
	// console.log(typeof data.healthGoal);
	// console.log(data.healthGoal);
	// const [healthgoals, setHealthgoals] = useState(data.healthGoal);
	// console.log(Object.entries(data.healthGoal));

	// useEffect(() => {
	//     dispatch(addadd()) 
	// }, [dispatch])

	return (
		<>
			<Navbar />
			<div className={classes["productdetail-container"]}>

				<div className={classes["productdetail-image"]}>
					<img src={data.image} />
				</div>

				<div className={classes["productdetail-content"]}>
					<div className={classes["content-info"]}>
						<div className={classes["info-name"]}> {data.name} </div>
						<p className={classes["info-desc"]}> {data.description} </p>

						<div className={classes["info-healthgoal"]}> 
							<p>Health Goal :</p>
							<div className={classes["healthgoal-list"]}> {data.healthGoal} </div>
						</div>
					</div>
					
					<div className={classes["content-buy"]}>
						<div className={classes["buy-price"]}>
							<p>Price :</p>
							<div className={classes["price-value"]}>{data.price}</div>
							<div className={classes["price-unit"]}>Bath</div>
						</div>

						<div className={classes["buy-qty"]}>
							<p>Amount :</p>
							<select onChange={handleNumpack} value={numpack}>
									<option >1</option>
									<option >2</option>
									<option >3</option>
									<option >4</option>
							</select>
							<div className={classes["buy-unit"]}>Pack</div>
						</div>

						<button className={classes["btn"]} onClick={() => 
							dispatch(add2CartAsync({ ...data, amount: numpack }))}>Add to cart</button>						
					</div>
				</div>
			</div>

			<Footer />
		</>
	)
}

export default ProductDetail
