import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/userActions.js';
import Message from '../message.js';
import Spinner from '../spinner.js';
import Entry from '../inputs/entry.js';
import Button from '../inputs/button.js';

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

  // Dispatch the register action on form submission
  const dispatch = useDispatch();
  const onRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { setInvalid("Passwords do not match.") }
    else { dispatch(register(name, email, password)) }
  }

  // Go to the redirect if the user is already logged in
  useEffect(() => { if (userInfo) { history.push(redirect) } },
    [history, userInfo, redirect])

  return (
    <form onSubmit={onRegister}
      className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col w-80 sm:w-96">
        <div className={"bg-gradient-to-b from-gray-800 via-gray-700 " +
          "to-gray-700 rounded-t-xl p-3 flex flex-row items-center justify-between"}>
          <h2 className="text-blue-100 text-lg font-semibold">Register New User</h2>
          <Link to="/login" className="text-yellow-100">Go to Login</Link>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700" />
        <div className="bg-gray-700 flex flex-col p-4">
        { loading ? <Spinner /> :
          <div className="flex flex-col">
            <Entry type="text" name="name" value={name}
              label="Name" required={true}
              onChange={(e) => setName(e.target.value)} extraClasses="mb-3" />
            <Entry type="email" name="email" value={email}
              label="Email" required={true}
              onChange={(e) => setEmail(e.target.value)} extraClasses="mb-3" />
            <Entry type="password" name="password" value={password}
              label="Password" required={true}
              onChange={(e) => setPassword(e.target.value)} extraClasses="mb-3" />
            <Entry type="password" name="confirmPassword" value={confirmPassword}
              label="Confirm Password" required={true}
              onChange={(e) => setConfirmPassword(e.target.value)} extraClasses="" />
            {error && <Message error={error} extraClasses="mt-3" />}
            {invalid && <Message error={invalid} extraClasses="mt-3" />}
          </div>
        }

        </div>
        <Button text="Create" type="submit" />
      </div>
    </form>
  )
}

export default Register;
