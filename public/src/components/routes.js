// Import basics
import React, { useState, useRef, useEffect } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
// Import router stuff
import { Route, Switch, useHistory } from 'react-router-dom';
// Import Components
import Home from './home';
import Products from './products/products.js';
import Product from './products/product.js';
import Cart from './cart/cart.js';
//import Login  from './login';
//import Forgot from './forgot';
//import Reset  from './reset';
//import Create from './create';

const Routes = () => {
  // Handle the reset password route
  const history = useHistory();
  //const dispatch = useDispatch();

  return (
    <main className="flex-grow flex flex-col">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/merch" component={Products} />
        <Route path="/merch/:id" component={Product} />
        <Route path="/cart/:id?" component={Cart} />
        {/*<Route exact path="/login"  component={Login} />*/}
        {/*<Route exact path="/forgot" component={Forgot} />*/}
        {/*<Route path="/reset/:token" component={Reset} />*/}
        {/*<Route exact path="/create" component={Create} />*/}
      </Switch>
    </main>
  )
}

export default Routes;
