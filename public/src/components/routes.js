// Import basics
//import React, { useState, useRef, useEffect } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
// Import router stuff
import { Route, Switch } from "react-router-dom";
// Import Components
import Home from "./home/_home.js";
import Products from "./products/viewAll/_products.js";
import Product from "./products/viewOne/_product.js";
import Cart from "./cart/_cart.js";
import Login from "./account/login.js";
import Profile from "./account/profile.js";
import Register from "./account/register.js";
import Shipping from "./checkout/shipping/_shipping.js";
import PaymentMethod from "./checkout/payment/_paymentMethod.js";
import OrderReview from "./checkout/summary/_orderReview.js";
import OrderPay from "./checkout/summary/_orderPay.js";
import Administration from "./admin/administration.js";

const Routes = () => {
  return (
    <main className="flex-grow flex flex-col">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/merch" component={Products} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/shipping" component={Shipping} />
        <Route exact path="/payment" component={PaymentMethod} />
        <Route exact path="/summary" component={OrderReview} />
        <Route path="/merch/search/:keyword" component={Products} />
        <Route exact path="/merch/page/:page" component={Products} />
        <Route
          exact
          path="/merch/search/:keyword/page/:page"
          component={Products}
        />
        <Route path="/merch/:id" component={Product} />
        <Route path="/cart/:id?" component={Cart} />
        <Route path="/order/:id" component={OrderPay} />
        <Route path="/admin" component={Administration} />
      </Switch>
    </main>
  );
};

export default Routes;
