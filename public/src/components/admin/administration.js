// Import basics
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import dispatch actions
import { getUsers } from '../../actions/userActions.js';
import { getProducts } from '../../actions/productActions.js';
// Import components
import Users from './users.js';
import Products from './products.js';
import Header from '../multipurpose/header.js';

const Administration = ({ history }) => {
  const { user } = useSelector(state => state.userLogin);

  // Load users and products
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProducts());
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      <div  className={`flex items-center justify-center w-full h-full
        px-4 sm:px-12 py-10`} >
        <div className="flex flex-col">
          <Header text="Administration" />
          <div className="grid grid-cols-1 ">
            <Users />
            <Products />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Administration;
