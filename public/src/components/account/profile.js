import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserDetails, updateUserDetails } from '../../actions/userActions.js';
import { getOrders } from '../../actions/orderActions.js';
import Message from '../message.js';
import Spinner from '../spinner.js';
import Entry from '../inputs/entry.js';
import Header from '../header.js';
import Button from '../inputs/button.js';
import InfoPanel from '../infoPanel.js';

const Profile = ({ location, history }) => {
  // Set form variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalid, setInvalid] = useState(null);

  // Grab user info from the state
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const ordersList = useSelector(state => state.ordersList);
  const { orders } = ordersList;

  // Validate entries and submit updates to user info
  const dispatch = useDispatch();
  const onSubmission = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { setInvalid("Passwords do not match.") }
    else { dispatch(updateUserDetails({id: user._id, name, email, password})) }
  }
  const onCart = () => { history.push('/cart')};

  // Get the user's info on load
  useEffect(() => {
    if (!userInfo) { history.push('/login') }
    else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(getOrders());
      }
      else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  return (
    <div  className="flex items-center justify-center w-full h-full px-4 py-10" >
      <div className="flex flex-col">
        <Header text="Your Account" />
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
          <form onSubmit={onSubmission} className="flex flex-col">
            <InfoPanel title="User Info" extraClasses="h-full" contentClasses="h-full"
              contents={
                loading ? <Spinner /> :
                  <div className="flex flex-col bg-gray-600 h-full border-r border-gray-600">
                    <Entry type="text" name="name" value={name} label="Name" required={true}
                      onChange={(e) => setName(e.target.value)} extraClasses="mb-3" />
                    <Entry type="email" name="email" value={email} label="Email" required={true}
                      onChange={(e) => setEmail(e.target.value)} extraClasses="mb-3" />
                    <Entry type="password" name="password" value={password} label="Password" required={true}
                      onChange={(e) => setPassword(e.target.value)} extraClasses="mb-3" />
                    <Entry type="password" name="confirmPassword" value={confirmPassword} label="Confirm Password" required={true}
                      onChange={(e) => setConfirmPassword(e.target.value)} extraClasses="" />
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
                orders.map((order, index) => {
                  return <Link to={`/order/${order._id}`} className="text-white">{order._id}</Link>
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
