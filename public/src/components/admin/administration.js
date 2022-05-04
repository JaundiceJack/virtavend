import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../actions/userActions.js';
import InfoPanel from '../multipurpose/infoPanel.js';
import ErrorMessage from '../multipurpose/errorMessage.js';
import Spinner from '../multipurpose/spinner.js';
import Users from './users.js';

// Import components
import Header from '../multipurpose/header.js';

const Administration = ({ history }) => {
  const userList = useSelector(state => state.userList);
  const { loading, error } = userList;

  const { user } = useSelector(state => state.userLogin);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      {
        loading ?
          <Spinner /> :
        error ?
          <ErrorMessage error={error} /> :
        <div  className="flex items-center justify-center w-full h-full px-4 sm:px-12 py-10" >
          <div className="flex flex-col">
            <Header text="Administration" />
            <div className="grid grid-cols-1 ">
              <Users />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Administration;
