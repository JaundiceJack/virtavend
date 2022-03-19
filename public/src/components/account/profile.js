import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserDetails, updateUserDetails, logout } from '../../actions/userActions.js';
import { getOrders } from '../../actions/orderActions.js';
import Message from '../multipurpose/message.js';
import Spinner from '../multipurpose/spinner.js';
import Entry from '../inputs/entry.js';
import Header from '../multipurpose/header.js';
import Button from '../inputs/button.js';
import InfoPanel from '../multipurpose/infoPanel.js';

const Profile = ({ location, history }) => {
  const formatDate = date => {
    const formit = new Date(date);
    return `${formit.getMonth()+1}\\${formit.getDate()}\\${formit.getFullYear()} `
  }


  // Set form variables
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const editInfo = e => setInfo({...info, [e.target.name]: e.target.value});
  const [invalid, setInvalid] = useState(null);

  // Grab user info from the state
  const { loading, error, user } = useSelector(state => state.userDetails);
  const { userInfo } = useSelector(state => state.userLogin);
  const { success } = useSelector(state => state.userUpdateProfile);
  const { orders } = useSelector(state => state.ordersList);
/* shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice, isPaid, isDelivered, _id, orderItems, user, paymentMethod, createdAt, updatedAt */


  // Validate entries and submit updates to user info
  const dispatch = useDispatch();
  const onSubmission = (e) => {
    e.preventDefault();
    if (info.password !== info.confirmPassword) { setInvalid("Passwords do not match.") }
    else { dispatch(updateUserDetails({ id: user._id, ...info })) }
  }
  const onCart = () => { history.push('/cart')};

  // Get the user's info on load
  useEffect(() => {
    if (!userInfo) { history.push('/login') }
    // If the authorization fails but the user is logged in, the token may have expired
    else if (error && error === 'Authorization failed.') {
      dispatch(logout());
      history.push('/login?redirect=profile');
    }
    else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(getOrders());
      }
      else setInfo({ ...info, name: user.name, email: user.email });
    }
  }, [dispatch, history, userInfo, user]);

  return (
    <div  className="flex items-center justify-center w-full h-full px-4 sm:px-12 py-10" >
      <div className="flex flex-col">
        <Header text="Your Account" />
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
          <form onSubmit={onSubmission} className="flex flex-col">
            <InfoPanel title="User Info" extraClasses="h-full" contentClasses="h-full"
              contents={
                loading ? <Spinner /> :
                  <div className="flex flex-col bg-gray-600 h-full border-r border-gray-600">
                    <Entry type="text" name="name" value={info.name} label="Name" required={true}
                      onChange={editInfo} extraClasses="mb-3" />
                    <Entry type="email" name="email" value={info.email} label="Email" required={true}
                      onChange={editInfo} extraClasses="mb-3" />
                    <Entry type="password" name="password" value={info.password} label="Password" required={true}
                      onChange={editInfo} extraClasses="mb-3" />
                    <Entry type="password" name="confirmPassword" value={info.confirmPassword} label="Confirm Password" required={true}
                      onChange={editInfo} extraClasses="" />
                    {error && <Message error={error} extraClasses="mt-3" />}
                    {invalid && <Message error={invalid} extraClasses="mt-3" />}
                    {success && <Message success={"Profile updated."} extraClasses="mt-3" />}
                  </div>
              } />
            <Button text="Update" type="submit" position="bl" smallPosition={false} />

          </form>

          <div className="flex flex-col">
            <InfoPanel title="Orders" extraClasses="h-full" contentClasses="h-full"
              contents={
                orders.sort((a, b) => { return a.createdAt < b.createdAt }).map((order, index) => {
                  return (
                    <Link to={`/order/${order._id}`}
                      className={
                        "text-white grid grid-cols-2 xl:grid-cols-4 my-2 gap-4 p-2 rounded opacity-80 hover:opacity-100 " +
                        (index % 2 === 0 ? "bg-gray-500" : "bg-gray-700")
                      }>
                      <p className="text-right font-semibold mr-2 ">Date Ordered:</p>
                      <p>{formatDate(order.createdAt)}</p>
                      <p className="text-right font-semibold mr-2 ">Total:</p>
                      <p>${order.totalPrice.toFixed(2)}</p>
                      <p className="text-right font-semibold mr-2 ">Payment Status:</p>
                      <p>{order.isPaid ? "Paid in Full" : "Not yet Paid"}</p>
                      <p className="text-right font-semibold mr-2 ">Delivery Status:</p>
                      <p>{order.isDelivered ? "Delivered" : "Not yet Delivered"}</p>

                    </Link>
                  )
                })
              }  />
            <Button text="Go to Cart" position="br"
              gradientDirection="bl" onClick={onCart} />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
