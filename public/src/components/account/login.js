import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, resetLoginError } from '../../actions/userActions.js';
import ErrorMessage from '../multipurpose/errorMessage.js';
import Spinner from '../multipurpose/spinner.js';
import Button from '../inputs/button.js';
import TextEntry from '../inputs/textEntry.js';

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
    [history, userInfo, redirect]);

  // Clear error messages
  useEffect(() => {
    setTimeout(() => { error !== null && dispatch(resetLoginError()) }, 5000);
  }, [dispatch, error]);

  return (
    <form onSubmit={onLogin} className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col w-80 sm:w-96">
        <div className="bg-header rounded-t-xl px-4 py-3 flex flex-row items-center justify-between">
          <h2 className="text-blue-100 text-lg font-semibold">Existing User</h2>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className="text-yellow-100">
            Create a New Account
          </Link>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700" />
        <div className="bg-gray-700 flex flex-col p-4">
          { loading ? <Spinner /> :
            <div className="flex flex-col pt-3">
              <TextEntry label="Email:"
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
              {error && <ErrorMessage error={error} /> }
            </div>
          }
        </div>
        <Button text="Login" type="submit" />
      </div>
    </form>
  )
}

export default Login;
