import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getOrderDetails, payOrder } from '../../../actions/orderActions.js';
import { ORDER_PAY_RESET } from '../../../actions/types.js';
import Radio from '../../inputs/radio.js';
import Spinner from '../../spinner.js';
import Message from '../../message.js';
import OrderSummary from './orderSummary.js';
import PaymentSummary from './paymentSummary.js';


const Confirmation = ({ match, history }) => {
  const orderId = match.params.id;

  // Make a loading variable for the PayPal SDK
  const [sdkReady, setSdkReady] = useState(false);

  // Grab user info from the state
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const dispatch = useDispatch();
  useEffect(() => {
    // Add the PayPal script to the page on loading
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
    // Get the order details if order or payment updated
    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
    // Enable PayPal if not yet paid
    else if (!order.isPaid) {
      if (!window.paypal) addPayPalScript()
      else setSdkReady(true);
    }
  }, [dispatch, userInfo, order, orderId, history, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(paymentResult))
  }

  return (
    <div className="flex flex-col justify-center w-full h-full px-4 sm:px-12 my-7 mx-auto" >
      {loading ? <Spinner /> :
       error ? <Message error={error} /> :
        (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-7 gap-12 h-full justify-self-start">
            <div className="col-span-1 md:col-span-2">
              <OrderSummary order={order} onPaySuccess={successPaymentHandler}
                loadingPay={loadingPay} sdkReady={sdkReady} />
            </div>
            <div className={"col-span-1 md:col-span-2 2xl:col-span-1 "}>
              <PaymentSummary order={order} />

            </div>
          </div>
        )
      }
    </div>
  )
}

export default Confirmation;
