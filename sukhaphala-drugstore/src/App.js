import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <div className="App">

        {/* <Navbar /> */}

        <Switch>

          <Route exact path='/' component={Home} />
          {/* <Route path='/Home' component={Home} /> */}
        
        </Switch>

      </div>
    </Router>
  );
}

export default App;
