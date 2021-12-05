import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Shop from './pages/Shop/Shop';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Card from './components/Card/Card';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import CartList from './components/CartList/CartList';
import AdminCreateProduct from './pages/AdminCreateProduct/AdminCreateProduct';
import { AdminShop } from './pages/AdminShop/AdminShop';
import AdminEditShop from './pages/AdminEditShop/AdminEditShop';
import { useSelector } from 'react-redux';

const App = () => {

  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <div className="App">

        {/* <Navbar /> */}

        <Switch>

          <Route exact path='/' component={Home} />
          <Route path='/Home' component={Home} />
          <Route path='/Navbar' component={Navbar} />
          <Route path='/Shop' component={Shop} />
          <Route path='/Login' component={Login} >
          {/* if successfully login, redirect to shop page */}
            { user.isAdmin ? <Redirect to='/AdminShop' /> : user.id ? <Redirect to='/Shop' /> : <Login />}
          </Route>
          <Route path='/Register' component={Register} />
          <Route path='/ProductDetail/:id' component={ProductDetail} />
          <Route path='/Card' component={Card} />
          <Route path='/Cart' component={Cart} />
          <Route path='/CartList' component={CartList} />
          <Route path='/AdminCreateProduct' component={AdminCreateProduct} />
          <Route path='/AdminShop' component={AdminShop} />
          <Route path='/AdminEditShop/:id' component={AdminEditShop} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
