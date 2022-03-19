// Import Basics
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Import redux actions
import { resetCart } from '../../../actions/cartActions.js';
import { createOrder, resetOrderCreate, resetOrderError } from '../../../actions/orderActions.js';
import { logout } from '../../../actions/userActions.js';
// Import Components
import Steps   from '../steps.js';
import Message from '../../multipurpose/message.js';
import Header  from '../../multipurpose/header.js';
import TotalSummary   from './totalSummary.js';
import AddressSummary from './addressSummary.js';
import ItemsSummary   from './itemsSummary.js';

const OrderReview = ({ history }) => {
  // Grab info from the state
  const { userInfo } = useSelector(state => state.userLogin);
  const { items, shippingAddress, savedPaymentMethod } = useSelector(state => state.cart);
  const { order, success, error } = useSelector(state => state.orderCreate);

  // Calculate Total Prices
  const itemsPrice = items.reduce((total, item) =>
    total + item.price * item.qty, 0).toFixed(2);
  const shippingPrice = (
    itemsPrice > 100 ? 0 :
    itemsPrice > 50 ? 7.50 : 12.50).toFixed(2);
  // TODO: Select tax rate based on location
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(taxPrice) +
    Number(shippingPrice)).toFixed(2);

console.log(error)

  // Perform actions when the page loads
  const dispatch = useDispatch();
  useEffect(() => {
    // Kick the user to login if not logged in
    if (!userInfo) history.push('/login?redirect=summary');
    // Kick to merch if the cart is empty
    if (items.length === 0) history.push('/merch');
    // If the authorization fails but the user is logged in, the token may have expired
    else if (error && error === 'Authorization failed.') {
      dispatch(logout());
      dispatch(resetOrderError());
      history.push('/login?redirect=summary');
    }
    // If an order was successfully created, go to its page
    else if (success) {
      dispatch(resetOrderCreate());
      dispatch(resetCart());
      history.push(`/order/${order._id}`);
    }
  },  [dispatch, history, userInfo, success, order]);

  // Kick the user back if there was no address or payment method
  if (!shippingAddress) history.push('/shipping');
  if (!savedPaymentMethod) history.push('/payment');

  // Validate entries and submit order info
  const submitOrder = () => {
    // If the authorization fails but the user is logged in, the token may have expired
    if (error && error === 'Authorization failed.') {
      dispatch(logout());
      dispatch(resetOrderError());
      history.push('/login?redirect=summary');
    }
    else {
      dispatch(createOrder({
        orderItems: items,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
        shippingAddress: shippingAddress,
        paymentMethod: savedPaymentMethod,
      }));
    }
  }

  return (
    <div className={"flex flex-col items-center w-full h-full px-4 sm:px-12 mb-6"}>
      <Steps step1={true} step2={true} step3={true} step4={'review'} />
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-7 gap-12">
        <div className="col-span-1 md:col-span-2 w-full h-full flex flex-col items-center">
          <Header text="Review Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <ItemsSummary items={items} />
            <AddressSummary shippingAddress={shippingAddress} />
          </div>
        </div>
        <div className={"col-span-1 md:col-span-2 2xl:col-span-1 "}>
          <TotalSummary submitOrder={submitOrder}
            error={error}
            method={savedPaymentMethod}
            itemsPrice={itemsPrice}
            shippingPrice={shippingPrice}
            taxPrice={taxPrice}
            totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  )
}

export default OrderReview;
