// Import basics
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import dispatch actions
import { getUserDetails, updateUserDetails, logout, resetLoginError } from '../../actions/userActions.js';
import { getOrders } from '../../actions/orderActions.js';
// Import components
import ErrorMessage from '../multipurpose/errorMessage.js';
import Message from '../multipurpose/message.js';
import Spinner from '../multipurpose/spinner.js';
import TextEntry from '../inputs/textEntry.js';
import Button from '../inputs/button.js';
import InfoPanel from '../multipurpose/infoPanel.js';

const Update = ({ history }) => {
  // Set form variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalid, setInvalid] = useState(null);

  // Grab user info from the state
  const { loading, error, user } = useSelector(state => state.userDetails);
  const { userInfo } = useSelector(state => state.userLogin);
  const { success } = useSelector(state => state.userUpdateProfile);

  // Define a regex pattern to check for upper+lowercase, number, & special character
  const lowerCasePattern = new RegExp("^(?=.*[a-z]).+$");
  const upperCasePattern = new RegExp("^(?=.*[A-Z]).+$");
  const digitPattern = new RegExp("^(?=.*\\d).+$");
  const specialPattern = new RegExp("^(?=.*[-+_!@#$%^&*.,?]).+$");

  // Validate entries and submit updates to user info
  const dispatch = useDispatch();
  const onSubmission = (e) => {
    e.preventDefault();
    if (name === "") {
      setInvalid("Username required.") }
    else if (email === "") {
      setInvalid("Email required.") }
    else if (password !== confirmPassword) {
      setInvalid("Passwords do not match.") }
    else if (password.length < 8) {
      setInvalid("Password must be 8 characters in length.") }
    else if (!lowerCasePattern.test(password)) {
      setInvalid("Password must contain a lowercase letter.") }
    else if (!upperCasePattern.test(password)) {
      setInvalid("Password must contain an uppercase letter.") }
    else if (!digitPattern.test(password)) {
      setInvalid("Password must contain a number.") }
    else if (!specialPattern.test(password)) {
      setInvalid("Password needs a special character (!@#$%^&*?).") }
    else { dispatch(updateUserDetails({ id: user._id, name, email, password })) }
  }

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
      else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  // Clear error messages
  useEffect(() => {
    setTimeout(() => {
      error !== null && dispatch(resetLoginError());
      invalid !== null && setInvalid(null);
    }, 5000);
  }, [dispatch, error, invalid]);

  return (
    <form onSubmit={onSubmission} className="flex flex-col">
      <InfoPanel title="Customer Info" extraClasses="h-full" contentClasses="h-full"
        contents={
          loading ? <Spinner /> :
            <div className="flex flex-col bg-gray-600 h-full border-r border-gray-600">
              <TextEntry
                name="name"
                value={name}
                label="Name:"
                onChange={e => setName(e.target.value)} />
              <TextEntry
                type="email"
                name="email"
                value={email}
                label="Email:"
                onChange={e => setEmail(e.target.value)} />
              <TextEntry
                type="password"
                name="password"
                value={password}
                label="Password:"
                onChange={e => setPassword(e.target.value)} />
              <TextEntry
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                label="Confirm Password:"
                onChange={e => setConfirmPassword(e.target.value)} />
              <p className="text-gray-100 text-center text-xs px-8">
                Password requires an upper and lower case letter, a number, and a special character.
              </p>
              {error && <ErrorMessage error={error} />}
              {invalid && <ErrorMessage error={invalid} />}
              {success && <Message success={"Profile updated."} />}
            </div>
      } />
      <Button text="Update" type="submit" position="bl" smallPosition={false} />
    </form>
  )
}

export default Update;
