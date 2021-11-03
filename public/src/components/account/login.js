import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/userActions.js';
import Message from '../message.js';
import Spinner from '../spinner.js';
import Entry from '../inputs/entry.js';
import Button from '../inputs/button.js';

const Login = ({ location, history }) => {
  // Set form variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Grab user info from the state
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // Grab any redirect from the history
  const redirect = location.search ? location.search.split('=')[1] : "/";

  // Dispatch the login action on form submission
  const dispatch = useDispatch();
  const onLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  // Go to the redirect if the user is already logged in
  useEffect(() => { if (userInfo) { history.push(redirect) } },
    [history, userInfo, redirect])

  return (
    <form onSubmit={onLogin} className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col w-80 sm:w-96">
        <div className="bg-header rounded-t-xl px-4 py-3 flex flex-row items-center justify-between">
          <h2 className="text-blue-100 text-lg font-semibold">Existing User</h2>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className="text-yellow-100">Create a New Account</Link>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700" />
        <div className="bg-gray-700 flex flex-col p-4">
          { loading ? <Spinner /> :
            <div className="flex flex-col">
              <Entry type="email" name="email" value={email} label="Email" required={true}
                onChange={(e) => setEmail(e.target.value)} extraClasses="mb-3" />
              <Entry type="password" name="password" value={password} label="Password" required={true}
                onChange={(e) => setPassword(e.target.value)} />
              {error && <Message error={error} extraClasses="mt-3" />}
            </div>
          }
        </div>
        <Button text="Login" type="submit" />
      </div>
    </form>
  )
}

export default Login;
