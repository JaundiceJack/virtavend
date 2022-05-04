import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register, resetLoginError } from '../../actions/userActions.js';
import ErrorMessage from '../multipurpose/errorMessage.js';
import Spinner from '../multipurpose/spinner.js';
import Button from '../inputs/button.js';
import TextEntry from '../inputs/textEntry.js';

const Register = ({ location, history }) => {
  // Set form variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalid, setInvalid] = useState(null);

  // Grab user info from the state
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // Grab any redirect from the history
  const redirect = location.search ? location.search.split('=')[1] : "/";

  // Define a regex pattern to check for upper+lowercase, number, & special character
  const lowerCasePattern = new RegExp("^(?=.*[a-z]).+$");
  const upperCasePattern = new RegExp("^(?=.*[A-Z]).+$");
  const digitPattern = new RegExp("^(?=.*\\d).+$");
  const specialPattern = new RegExp("^(?=.*[-+_!@#$%^&*.,?]).+$");

  // Dispatch the register action on form submission
  const dispatch = useDispatch();
  const onRegister = (e) => {
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
    else { dispatch(register(name, email, password)) }
  }

  // Go to the redirect if the user is already logged in
  useEffect(() => {
    if (userInfo) { history.push(redirect) }
  }, [history, userInfo, redirect]);

  // Clear error messages
  useEffect(() => {
    setTimeout(() => {
      error !== null && dispatch(resetLoginError());
      invalid !== null && setInvalid(null);
    }, 5000);
  }, [dispatch, error, invalid]);

  return (
    <form onSubmit={onRegister}
      className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col w-80 sm:w-96">
        <div className={"bg-gradient-to-b from-gray-800 via-gray-700 " +
          "to-gray-700 rounded-t-xl p-3 flex flex-row items-center justify-between"}>
          <h2 className="text-blue-100 text-lg font-semibold">New Customer</h2>
          <Link to="/login" className="text-yellow-100">Go to Login</Link>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700" />
        <div className="bg-gray-700 flex flex-col p-4">
        { loading ? <Spinner /> :
          <div className="flex flex-col pt-3">
            <TextEntry
              label="Name:"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)} />
            <TextEntry
              label="Email:"
              name="email"
              value={email}
              type="email"
              onChange={e => setEmail(e.target.value)} />
            <TextEntry
              label="Password:"
              name="password"
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)} />
            <TextEntry
              label="Confirm Password:"
              name="confirmPassword"
              value={confirmPassword}
              type="password"
              onChange={e => setConfirmPassword(e.target.value)} />
            <p className="text-gray-100 text-center text-xs px-8 mb-3">
              Password requires an upper and lower case letter, a number, and a special character.
            </p>
            {error && <ErrorMessage error={error} />}
            {invalid && <ErrorMessage error={invalid} />}
          </div>
        }

        </div>
        <Button text="Create" type="submit" />
      </div>
    </form>
  )
}

export default Register;
