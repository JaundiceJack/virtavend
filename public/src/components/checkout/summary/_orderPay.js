// Import Basics
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// Import redux actions
import { getOrderDetails, payOrder } from '../../../actions/orderActions.js';
import { ORDER_PAY_RESET } from '../../../actions/types.js';
// Import Components
import Spinner from '../../multipurpose/spinner.js';
import Message from '../../multipurpose/message.js';
import Header  from '../../multipurpose/header.js';
import PaymentSummary   from './paymentSummary.js';
import AddressSummary   from './addressSummary.js';
import ItemsSummary     from './itemsSummary.js';
import ConfirmedSummary from './confirmedSummary.js';
import PayPalSummary    from './paypalSummary.js';

const OrderPay = ({ match, history }) => {
  // Get the order ID from the address
  const orderId = match.params.id;

  // Make a loading variable for the PayPal SDK
  const [sdkReady, setSdkReady] = useState(false);

  // Grab user info from the state
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading: loadingOrder, order, error } = orderDetails;
  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // Perform actions when the page loads
  const dispatch = useDispatch();
  useEffect(() => {
    // Add the PayPal script to the page
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => { setSdkReady(true) };
      document.body.appendChild(script);
    }
    // Kick the user to login if not logged in
    if (!userInfo) history.push(`/login?redirect=order/${orderId}`);

    // TODO: check the token for an expiration date, and kick user to login if past

    // Get the order details and reinitialize the payment state
    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
    // Enable PayPal if not yet paid
    else if (!order.isPaid) {
      if (!window.paypal) addPayPalScript()
      else setSdkReady(true);
    }
  }, [dispatch, history, userInfo, order, orderId, successPay]);

  // When PayPal payment succeeds, dispatch an update to the user's order
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(paymentResult)) }

  return (
    <div className="flex flex-col justify-center w-full h-full px-4 sm:px-12 my-7 mx-auto" >
      {
        loadingOrder ? <Spinner /> :
        error ? <Message error={error} /> :
        <div className={"grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 " +
          "mt-7 gap-12 h-full justify-self-start"}>
          <div className="col-span-1 md:col-span-2 w-full h-full flex flex-col items-center">
            <Header text="Order Details" />
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <ItemsSummary items={order.orderItems} />
              {!order.isPaid &&
                <PayPalSummary
                  total={order.totalPrice}
                  onSuccess={successPaymentHandler}
                  loadingPay={loadingPay}
                  sdkReady={sdkReady}
                />
              }
            </div>
          </div>
          <div className={"col-span-1 md:col-span-2 2xl:col-span-1 "}>
            <PaymentSummary order={order} />
          </div>
        </div>
      }
    </div>
  )
}

export default OrderPay;
