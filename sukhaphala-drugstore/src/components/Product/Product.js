import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '../Card/Card'

const Product = (props) => {
	const user = useSelector((state) => state.auth.user); //use for track the user role

	return (
		<NavLink to={user.isAdmin ? `/AdminEditShop/${props.id}` : `/ProductDetail/${props.id}`}>
			<Card 
				id={props.id}
				title={props.title}
				price={props.price}
				img={props.img}
				desc={props.desc}
				button={user.isAdmin ? 'Edit' : 'Explore More...'}
			/>
		</NavLink>
	)
}

export default Product
