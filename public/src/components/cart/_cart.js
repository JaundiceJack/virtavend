// Import Basics
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Import server actions
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions.js';
// Import components
import Message from '../message.js';
import Header from '../header.js';
import Button from '../inputs/button.js';
import Item from './item.js';

const Cart = ({ match, location, history }) => {
  // Get the product ID and quantity if items were added to the cart
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  useEffect(() => { productId && dispatch(addItemToCart(productId, qty)) },
  [dispatch, productId, qty]);
  const checkoutHandler = () => { history.push('/login?redirect=shipping') };

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
          extraClasses="my-auto px-8 py-4 self-center"
        /> :
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 2xl:mt-7 gap-12">
          <div className={"col-span-1 md:col-span-2"}>
            <Header text="My Cart" />
            {items.map((item, index) => {
              return (
                <Item key={index} index={index}
                  item={item}
                  selectQty={e=> dispatch(
                    addItemToCart(item.product, Number(e.target.value)))}
                  removeItem={() => dispatch(
                    removeItemFromCart(item.product))} />
              )
            })}

            <div className="bg-footer rounded-b-xl h-14 w-full border-t border-gray-700"></div>
          </div>

          <div className={"col-span-1 md:col-span-2 2xl:col-span-1 "}>
            <Header text="Subtotal" />
            <div className="flex flex-col">
              <div className="grid grid-cols-2">
                <div className="flex flex-row justify-center bg-gray-700 p-4 border-r border-gray-600">
                  <p className="text-right font-semibold text-white mr-2">Items:</p>
                  <p className="font-semibold text-white">{items.reduce((total, item) => total + item.qty, 0)}</p>
                </div>
                <div className="flex flex-row justify-center bg-gray-700 p-4">
                  <p className="text-right font-semibold text-white mr-2">Total:</p>
                  <p className="font-semibold text-white">${items.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2)}</p>
                </div>
              </div>
              <Button text="Checkout" onClick={checkoutHandler}
                disabled={items.length === 0} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Cart;
