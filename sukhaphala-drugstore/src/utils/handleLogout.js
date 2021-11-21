import axios from "axios";
import Cookies from "js-cookie";
import { clearAuth } from '../redux/actions/authenAction';
import { clearCart } from "../redux/actions/cartActions";
import {store} from '../redux/store';

const handleLogout = () => {
  // const dispatch = useDispatch();

  axios.get('http://localhost:5000/auth/logout')
  .then(res=>{
      console.log(res);
      if (res.data.type === 'SUCCESS') {
        Cookies.remove('token');
        // localStorage.removeItem('root');
        console.log('dispatch here');
        store.dispatch(clearAuth());
        store.dispatch(clearCart());
      }
  })
};

export default handleLogout;