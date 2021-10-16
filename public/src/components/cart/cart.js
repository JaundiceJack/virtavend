import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../actions/cartActions.js';
import Message from '../message.js';
import { FaRegTrashAlt } from 'react-icons/fa';

const Cart = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  useEffect(() => { productId && dispatch(addItemToCart(productId, qty)) },
  [dispatch, productId, qty]);



  return (
    <div className={"w-full h-full px-4 sm:px-12 my-7 mx-auto " +
      "flex flex-col self-center"}>
      <div className="" />

      {items.length === 0 ?
        <Message info="Your cart is empty. Go"
          link={<Link className={"ml-1 text-2xl transform duration-300 " +
          "hover:scale-105 hover:translate-x-1 bg-clip-text text-transparent "+
          "bg-gradient-to-br from-blue-600 to-yellow-600 font-semibold"}
          to="/merch">shopping?</Link>}
          extraClasses="mt-10"
        /> :
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 2xl:mt-7 gap-12">
          <div className={"col-span-1 md:col-span-2"}>
            <h2 className="bg-gradient-to-b from-gray-800 via-gray-700 to-gray-700 rounded-t-xl text-white font-semibold text-xl py-4 text-center border-b border-gray-600">My Cart</h2>
            {items.map((item, index) => {
              return <div key={index} className={
                (index % 2 === 0 ? "bg-gray-800 " : "bg-gray-700 ") +
                (index === items.length-1 && "rounded-b-lg ") +
                " px-4 py-4 grid grid-cols-2 gap-y-4 sm:gap-y-0 sm:grid-cols-5"}>
                <Link to={`/merch/${item.product}`}
                  className="h-20 w-20 p-1 bg-white rounded self-center justify-self-center sm:justify-self-start">
                  <img src={item.image} className="h-18 mx-auto" />
                </Link>
                <div className="flex flex-col sm:col-span-2 self-center">
                  <Link to={`/merch/${item.product}`}
                    className="text-white font-semibold text-xl">
                    {item.name}
                  </Link>
                  <p className="text-white font-semibold text-xl">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <select name="qty"
                  value={item.qty}
                  onChange={e=> dispatch(
                    addItemToCart(item.product, Number(e.target.value)))}
                  className="rounded-lg mr-2 w-10 h-8 text-lg self-center justify-self-center sm:justify-self-end">
                  {[...Array(item.countInStock).keys()].map(i => {
                    return (<option key={i+1} value={i+1}>{i+1}</option>)
                  })}
                </select>
                <button title="Remove from cart"
                  className={"transform duration-300 hover:scale-105 " +
                  "justify-self-start sm:justify-self-center"}>
                  <FaRegTrashAlt className="text-2xl text-red-300"/>
                </button>
              </div>
            })}
          </div>

          <div className={"col-span-1 md:col-span-2 2xl:col-span-1 "}>
            <div className="bg-gradient-to-b from-gray-800 via-gray-700 to-gray-700 rounded-t-xl py-4 border-b border-gray-600">
              <h2 className=" text-white font-semibold text-xl text-center ">Subtotal</h2>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-x-2 bg-gray-800 p-4">
                <p className="text-right font-semibold text-white">Items:</p>
                <p className="font-semibold text-white">{items.reduce((total, item) => total + item.qty, 0)}</p>
              </div>
              <div className="grid grid-cols-2 gap-x-2 bg-gray-700 p-4">
                <p className="text-right font-semibold text-white">Total:</p>
                <p className="font-semibold text-white">${items.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2)}</p>
              </div>
              <Link to="/checkout"
                className={"bg-yellow-500 rounded-b-xl border-t border-gray-600"}>
                <div className={"w-full h-full flex items-center justify-center " +
                  "rounded-b-xl text-center group relative p-4  " +
                  "bg-gradient-to-br from-gray-700 via-gray-700 to-gray-500 " +
                  "buttonBorder transform duration-300 " +
                  "hover:from-gray-700 hover:via-gray-600 hover:to-gray-500  "}>
                  <p className={"text-lg text-yellow-400 font-semibold whitespace-nowrap "}>
                  Checkout
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Cart;
