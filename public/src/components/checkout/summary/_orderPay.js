// Import Basics
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
// Import redux actions
import { resetCart } from "../../../actions/cartActions.js";
import {
  createOrder,
  resetOrderCreate,
  resetOrderError,
} from "../../../actions/orderActions.js";
import { logout } from "../../../actions/userActions.js";
// Import Components
import Steps from "../steps.js";
import Message from "../../multipurpose/message.js";
import Header from "../../multipurpose/header.js";
import TotalSummary from "./totalSummary.js";
import AddressSummary from "./addressSummary.js";
import ItemsSummary from "./itemsSummary.js";
import PayPalSummary from "./paypalSummary.js";
import TokenValidation from "../../multipurpose/tokenValidation.js";

/*
 So, i've kind of blasted the stuff i had,
 got a bit aimless
 i looked at the code for the paypal button from npm
 and it doesn't look like there's an easy way to do stuff pre-payment
 so now i'm copypasting the code from paypal's docs for their advanced version of the buttons
 so now that i've decided to try and do that, i'll remove the code from the button
 and consolidate the review and payment pages 

 ok, so i transfered the page stuff,
 i guess now i need to remake the order summary page
i copied the code from paypal and the button seems to show up, so thats a start
i guess i need to add a check that it's already there though since it adds a new one each time the page updates

*/

const OrderPay = ({ history }) => {
  // Grab info from the state
  const { items, shippingAddress, savedPaymentMethod } = useSelector(
    (state) => state.cart
  );
  const { order, success, error } = useSelector((state) => state.orderCreate);
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );
  // Make a loading variable for the PayPal SDK
  const [sdkReady, setSdkReady] = useState(false);

  // Calculate Total Prices
  const itemsPrice = items
    .reduce((total, item) => total + item.price * item.qty, 0)
    .toFixed(2);
  const shippingPrice = (
    itemsPrice > 100 ? 0 : itemsPrice > 50 ? 7.5 : 12.5
  ).toFixed(2);
  // TODO: Select tax rate based on location
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(taxPrice) +
    Number(shippingPrice)
  ).toFixed(2);

  // Add the PayPal script to the page
  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPayPalScript();
    } else {
      window.paypal
        .Buttons({
          // Sets up the transaction when a payment button is clicked
          createOrder: function (data, actions) {
            return fetch("/api/orders", {
              method: "post",
              // use the "body" param to optionally pass additional order information
              // like product ids or amount
            })
              .then((response) => response.json())
              .then((order) => order.id);
          },
          // Finalize the transaction after payer approval
          onApprove: function (data, actions) {
            return fetch(`/api/orders/${data.orderID}/capture`, {
              method: "post",
            })
              .then((response) => response.json())
              .then((orderData) => {
                // Successful capture! For dev/demo purposes:
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
                var transaction =
                  orderData.purchase_units[0].payments.captures[0];
                alert(`Transaction ${transaction.status}: ${transaction.id}
            See console for all available details
          `);
                // When ready to go live, remove the alert and show a success message within this page. For example:
                // var element = document.getElementById('paypal-button-container');
                // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                // Or go to another URL:  actions.redirect('thank_you.html');
              });
          },
        })
        .render("#paypal-button-container");
    }
  }, []);

  // Perform actions when the page loads
  const dispatch = useDispatch();
  // Enable PayPal
  useEffect(() => {
    if (!window.paypal) addPayPalScript();
    else setSdkReady(true);
  }, []);
  // Kick to merch if the cart is empty
  useEffect(() => {
    if (items.length === 0) history.push("/merch");
  }, [dispatch, items]);
  // If an order was successfully created, empty the cart and go to its page
  useEffect(() => {
    if (success) {
      dispatch(resetOrderCreate());
      dispatch(resetCart());
      history.push(`/order/${order._id}`);
    }
  }, [dispatch, success, order]);
  // Kick the user back if there was no address or payment method
  useEffect(() => {
    if (!shippingAddress) history.push("/shipping");
    if (!savedPaymentMethod) history.push("/payment");
  }, [shippingAddress, savedPaymentMethod]);

  // OK SO, it appears the way im supposed to do it is actually just let the user pay and deal
  // with it later if the server doesnt respond and make their order....
  // it would be prudent to include the order info with the paypal order so they have some recourse
  // another thing, the stock, before sending the payment request i need to ensure
  // that there are still items in stock to buy
  // like, is there a way to detect it in the onSuccess and repeal the payment if the stock ran out?

  // what if i make a blank order on the screen before this,
  // and then just add the payment/details to it on success,
  // maybe pass in the items so it secures the stock for the hour,
  // which means, HMMMM
  // a lot of back end magic,
  // like a token with an expiration or
  // uhg that's too much
  // the problem here is if one user orders all the stock of one thing,
  // then another user is on the payment screen with them in the cart,
  // ah, so, on this page i need to send a get producTEWTEASDFDSAF
  // ANOTHER FUCKING THING I HAVE TO DO BEFORE THE PAYMENT CALL
  // i think i almost need to look at his code and make my own...
  //

  // When PayPal payment succeeds, dispatch an update to the user's order
  const successPaymentHandler = async (paymentResult) => {
    try {
      const orderSuccess = await dispatch(
        createOrder({
          orderItems: items,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
          shippingAddress: shippingAddress,
          paymentMethod: savedPaymentMethod,
          isPaid: true,
          paidAt: Date.now(),
          paymentResult: {
            id: paymentResult.id,
            status: paymentResult.status,
            update_time: paymentResult.update_time,
            email_address: paymentResult.payer.email_address,
          },
        })
      );
      if (orderSuccess) history.push(`/order/${orderSuccess}`);
    } catch (e) {
      console.log("oops");
    }
  };

  return (
    <div
      className={"flex flex-col items-center w-full h-full px-4 sm:px-12 mb-6"}
    >
      <TokenValidation history={history} redirect={`/login?redirect=summary`} />
      <Steps step1={true} step2={true} step3={true} step4={"review"} />
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-7 gap-12">
        <div id="paypal-button-container" class="paypal-button-container"></div>
        <div className="col-span-1 md:col-span-2 w-full h-full flex flex-col items-center">
          <Header text="Review Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <ItemsSummary items={items} />
            <AddressSummary shippingAddress={shippingAddress} />
          </div>
        </div>
        <div className={"col-span-1 md:col-span-2 2xl:col-span-1 "}>
          <TotalSummary
            error={error}
            method={savedPaymentMethod}
            itemsPrice={itemsPrice}
            shippingPrice={shippingPrice}
            taxPrice={taxPrice}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderPay;

/*
// Import basics
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import dispatch actions
import { validateToken } from "../../../actions/userActions.js";
import { getOrderDetails, payOrder } from "../../../actions/orderActions.js";
import { ORDER_PAY_RESET } from "../../../actions/types.js";
// Import components
import Spinner from "../../multipurpose/spinner.js";
import Message from "../../multipurpose/message.js";
import Header from "../../multipurpose/header.js";
import TokenValidation from "../../multipurpose/tokenValidation.js";
import PaymentSummary from "./paymentSummary.js";
import AddressSummary from "./addressSummary.js";
import ItemsSummary from "./itemsSummary.js";
import ConfirmedSummary from "./confirmedSummary.js";


const OrderPay = ({ match, history }) => {
  // Get the order ID from the address
  const orderId = match.params.id;

  // Get states
  const {
    loading: loadingOrder,
    order,
    error,
  } = useSelector((state) => state.orderDetails);

  // Perform actions when the page loads
  const dispatch = useDispatch();

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]);

  
  return (
    <div className="flex flex-col justify-center w-full h-full px-4 sm:px-12 my-7 mx-auto">
      <TokenValidation
        history={history}
        redirect={`/login?redirect=order/${orderId}`}
      />
      {loadingOrder ? (
        <Spinner />
      ) : error ? (
        <Message error={error} />
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 
            mt-7 gap-12 h-full justify-self-start`}
        >
          <div className="col-span-1 md:col-span-2 w-full h-full flex flex-col items-center">
            <Header text="Order Details" />
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <ItemsSummary items={order.orderItems} />
            </div>
          </div>
          <div className={"col-span-1 md:col-span-2 2xl:col-span-1 "}>
            <PaymentSummary order={order} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPay;
*/
