import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/userActions.js';
import { FaShoppingCart } from 'react-icons/fa';


const Nav = () => {
  const [showDD, setShowDD] = useState(false);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const linkCs = "sm:ml-5 text-white font-semibold transform "+
                 "duration-150 hover:scale-105 ";


  return (
    <nav className={
      `sticky top-0 z-50 mx-4 sm:mx-12 bg-gradient-to-b from-gray-900
       to-gray-800 shadow-md h-18 rounded-b-lg flex items-center`}>
      <Link to="/"
        onClick={() => setShowDD(false)}
        className="flex flex-row items-center group relative ml-3">
        <img src="/images/logo.png" alt="Logo" className={
          `w-14 h-14 rounded-xl opacity-100 group-hover:opacity-0
           transition duration-300 border-2 border-yellow-400`
        } />

        <div className={
          `w-14 h-14 absolute border-2 border-yellow-400 rounded-md px-2 pt-1
          font-bold bg-clip-text text-xs text-transparent bg-gradient-to-tl
          from-yellow-400 to-yellow-600 leading-tight opacity-0
          group-hover:opacity-100 transition duration-300 text-center`}>
          <p>Web</p><p>of</p><p>Wares</p>
        </div>
      </Link>
      <div className={
        `flex-grow flex flex-row justify-center items-center sm:m-0 mb-1`}>
        <div className="flex sm:flex-row flex-col mr-2 sm:mr-0 items-center">
          <Link to="/merch"
            onClick={() => setShowDD(false)}
            className={linkCs}>
            Products
          </Link>
          <a href="/#" className={linkCs}>Shipping</a>
        </div>
        <div className="flex sm:flex-row flex-col ml-2 sm:ml-0 items-center">
          <a href="/#" className={linkCs+" "}>Contact</a>
          {userInfo ?
            <div className="relative">
              <button onClick={()=>setShowDD(!showDD)}
                className={linkCs+" relative z-10 focus:outline-none flex flex-row items-center"}>
                <p className="mr-1">My Account</p>
                <svg className={"h-5 w-5 text-white " + (showDD ? "transform rotate-180" : "")} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd"
                    d={"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 " +
                      "111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"} />
                </svg>
              </button>
              {showDD &&
                <div className={"absolute right-0 sm:-right-20 mt-2 sm:mt-5 " +
                  "py-2 w-48 bg-white rounded-b-md shadow-xl z-20"}>
                  <Link to="/profile"
                    onClick={()=>setShowDD(false)}
                    className={"block px-4 py-2 text-sm text-gray-700 " +
                      "hover:bg-blue-500 hover:text-white"}>
                    Your Profile
                  </Link>
                  <Link to="/cart"
                    onClick={()=>setShowDD(false)}
                    className={"block px-4 py-2 text-sm text-gray-700 " +
                      "hover:bg-blue-500 hover:text-white"}>
                    Your Cart
                  </Link>
                  {userInfo.isAdmin &&
                    <Link to="/admin"
                      onClick={()=>setShowDD(false)}
                      className={"block px-4 py-2 text-sm text-gray-700 " +
                        "hover:bg-blue-500 hover:text-white"}>
                      Administration
                    </Link>
                  }
                  <button onClick={() => { dispatch(logout()); setShowDD(false); }}
                    className={"w-full block px-4 py-2 text-sm text-gray-700 " +
                      "text-left hover:bg-blue-500 hover:text-white"}>
                    Sign Out
                  </button>
                </div>
              }
            </div> :
            <Link to="/login"
              title="Sign In"
              onClick={()=>setShowDD(false)}
              className={linkCs}>
              Sign In
            </Link>
          }
        </div>
      </div>
      <Link to='/cart'
        className="self-center transform duration-150 hover:scale-110"
        title="Your Shopping Cart">
        <FaShoppingCart className="mx-4 text-2xl text-blue-100" />
      </Link>

    </nav>
  );
};

export default Nav;
