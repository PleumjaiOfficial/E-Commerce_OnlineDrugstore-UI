import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Shop from './pages/Shop/Shop';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Card from './components/Card/Card';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import CartList from './components/CartList/CartList';
import AdminCreateProduct from './pages/Admin/AdminCreateProduct/AdminCreateProduct';
import { AdminShop } from './pages/Admin/AdminShop/AdminShop';
import AdminEditShop from './pages/Admin/AdminEditShop/AdminEditShop';

const App = () => {
  return (
    <Router>
      <div className="App">

        {/* <Navbar /> */}

        <Switch>

          <Route exact path='/' component={Home} />
          <Route path='/Home' component={Home} />
          <Route path='/Navbar' component={Navbar} />
          <Route path='/Shop' component={Shop} />
          <Route path='/Login' component={Login} />
          <Route path='/Register' component={Register} />
          <Route path='/ProductDetail/:id' component={ProductDetail} />
          <Route path='/Card' component={Card} />
          <Route path='/Cart' component={Cart} />
          <Route path='/CartList' component={CartList} />
          <Route path='/AdminCreateProduct' component={AdminCreateProduct} />
          <Route path='/AdminShop' component={AdminShop} />
          <Route path='/AdminEditShop' component={AdminEditShop} />
        
        </Switch>

      </div>
    </Router>
  );
}

export default App;
