import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../../../actions/orderActions.js';
import Steps from '../steps.js';
import Message from '../../message.js';

import TotalSummary from './totalSummary.js';
import DetailsSummary from './detailsSummary.js';

const ReviewOrder = ({ history }) => {
  // Grab info from the state
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector(state => state.cart);
  const { items, shippingAddress, savedPaymentMethod } = cart;
  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;

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

  // Kick the user to login if not logged in
  useEffect(() => {
    if (!userInfo) history.push('/login?redirect=placeorder')
    else if (success) history.push(`/order/${order._id}`)
  },
    [userInfo, success, order, history]);
  // Kick the user back if there was no address or payment method
  if (!shippingAddress) history.push('/shipping');
  if (!savedPaymentMethod) history.push('/payment');

  // Validate entries and submit order info
  const dispatch = useDispatch();
  const submitOrder = () => {
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

  return (
    <div className={"flex flex-col items-center w-full h-full px-4 sm:px-12 mb-6"}>
      <Steps step1={true} step2={true} step3={true} step4={'current'} />
      {items.length === 0 ?
        <Message info="Your cart is empty. Go"
          link={<Link className={"ml-1 text-2xl transform duration-300 " +
          "hover:scale-105 hover:translate-x-1 bg-clip-text text-transparent "+
          "bg-gradient-to-br from-blue-600 to-yellow-600 font-semibold"}
          to="/merch">shopping?</Link>}
          extraClasses="my-auto self-center"
        /> :
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-7 gap-12">
          <div className="col-span-1 md:col-span-2">
            <DetailsSummary cart={cart} />
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
      }
    </div>
  )
}

export default ReviewOrder;
