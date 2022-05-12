// Import basics
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import dispatch actions
import { getUsers, validateToken } from '../../actions/userActions.js';
import { getProducts } from '../../actions/productActions.js';
// Import components
import Users from './users.js';
import Products from './products.js';
import Header from '../multipurpose/header.js';
import Spinner from '../multipurpose/spinner.js';

const Administration = ({ history }) => {
  const { userInfo, loading } = useSelector(state => state.userLogin);
  const { validating } = useSelector(state => state.userToken);

  // Load users and products
  const dispatch = useDispatch();
  useEffect(() => {
    const relog = async () => {
      if (userInfo && !userInfo.isAdmin) history.push('/login');
      else if (!userInfo) history.push('/login')
      else {
        const validToken = await dispatch(validateToken(userInfo.token));
        console.log(validToken);
        if (validToken) {
          dispatch(getUsers());
          dispatch(getProducts());
        } else history.push('/login');
      }
    }
    relog();
  }, [userInfo, dispatch]);

  return (
    <div className="h-full flex items-center justify-center">
      <div  className={`flex items-center justify-center w-full h-full
        px-4 sm:px-12 py-10`} >
        <div className="flex flex-col">
          <Header text="Administration" />
          {
            (loading || validating) ? <Spinner /> :
            <div className="grid grid-cols-1">
              <Users />
              <Products />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Administration;
