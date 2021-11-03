import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../../actions/cartActions.js';
import Radio from '../../inputs/radio.js';
import Button from '../../inputs/button.js';
import Steps from '../steps.js';
import Header from '../../header.js';

const PaymentMethod = ({ history }) => {
  // Grab user info from the state
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector(state => state.cart);
  const { shippingAddress, savedPaymentMethod } = cart;

  // Set form variables
  const [paymentMethod, setPaymentMethod] = useState(savedPaymentMethod || "paypal");

  // Set form variables
  //const [card, setCard] = useState({ number: "", expMonth: "", expYear: "", code: "" });
  //const editCard = e => setCard({ ...card, [e.target.name]: e.target.value });
  //const [billingAddress, setBillingAddress] = useState({ address: "", city: "", state: "", zip: "", country: "" });
  //const editBillingAddress = e=> setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });

  // Kick the user to login if not logged in
  useEffect(() => { if (!userInfo) history.push('/login?redirect=payment') },
    [userInfo, history]);
  // Kick the user to the shipping screen if there was no address
  if (!shippingAddress) history.push('/shipping');

  // Submit payment method and go to payment details screen
  const dispatch = useDispatch();
  const onPaymentMethod = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/summary');
  }

  return (
    <form onSubmit={onPaymentMethod} className="flex flex-col items-center w-full h-full px-4 mb-6" >
      <Steps step1={true} step2={true} step3={'current'} />
      <div className="flex flex-col mt-7">
        <Header text="Payment Method" />
        <div className="bg-gray-700 flex flex-col py-4 px-8">
          <Radio name="paymentMethod" value={paymentMethod}
            label="Choose One" onChange={e => setPaymentMethod(e.target.value)}
            options={[
              {label: 'Credit Card', label2: 'or PayPal', value: 'paypal'},
              {label: "Bitcoin", value: 'bitcoin'},
            ]} />
        </div>
        <Button text="Review Order" type="submit" />
      </div>
    </form>
  )
}

export default PaymentMethod;
