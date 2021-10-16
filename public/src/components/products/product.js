import { Link } from 'react-router-dom';
import RatingB from './ratingB';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../actions/productActions.js';
import Spinner from '../spinner.js';
import Message from '../message.js';
import { FaCartArrowDown } from 'react-icons/fa';

const Product = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const { product, loading, error } = useSelector(state => state.productDetails);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getProduct(match.params.id)), [dispatch, match]);

  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  }

  return (
    <div className={"w-full h-full px-4 sm:px-12 my-7 mx-auto " +
      "flex flex-col items-center justify-center"}>
      <div className="w-full h-full flex items-center justify-center">
        { loading ? (<Spinner />) :
          error ? (<Message error={error} />) :
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 2xl:mt-7">
            <div className="flex flex-col col-span-1 md:col-span-2 2xl:-mt-10 mb-8 2xl:mb-0">
              <Link to="/merch"
                className={"self-start h-10 bg-yellow-500 rounded-t-xl " +
                  "border-b border-gray-600"}>
                <div className={"w-full h-full flex items-center justify-center " +
                  "rounded-t-xl text-center group relative p-4  " +
                  "bg-gradient-to-tl from-gray-700 via-gray-700 to-gray-500 " +
                  "buttonBorder transform duration-300 " +
                  "hover:from-gray-700 hover:via-gray-600 hover:to-gray-500  "}>
                  <p className={"text-lg text-yellow-400 font-semibold whitespace-nowrap "}>
                  Go Back
                  </p>
                </div>
              </Link>
              <div className={"grid grid-cols-1 sm:grid-cols-2 rounded-b-lg " +
                "rounded-tr-xl bg-gray-700"}>
                <div className={"p-4 bg-gray-700 rounded-tr-xl sm:rounded-tr-none " +
                  "sm:rounded-bl-lg sm:row-span-2 sm:border-r sm:border-gray-600"}>
                  <div className="bg-white rounded-lg p-2">
                    <img src={product.image} alt={product.name} className="" />
                  </div>
                </div>

                <div className="flex flex-col sm:row-span-2">
                  <h3 className={"font-bold text-white text-3xl capitalize " +
                    "bg-gray-700 py-4 px-6 rounded-tr-xl"}>{product.name}
                  </h3>
                  <RatingB
                    value={product.rating}
                    numReviews={product.numReviews}
                    textColor="text-white"
                    extraClasses="bg-gray-800 border-r border-gray-600 font-semibold border-b border-t border-gray-600"
                  />
                  <div className={"bg-gray-700 p-6 sm:rounded-bl-none " +
                    "rounded-bl-lg rounded-br-lg flex-grow"}>
                    <h3 className={"bg-gradient-to-r from-gray-100 via-white to-gray-100 border-2 border-gray-500 py-4 px-6 " +
                      "text-lg text-black font-semibold rounded-lg break-anywhere " +
                      "h-full "}>
                      {product.description}
                    </h3>
                  </div>
                </div>
              </div>
            </div>




            <div className="w-full col-span-2 2xl:col-span-1 md:w-3/4 3xl:w-3/5 self-start justify-self-center">
{/* Price */}
              <div className="grid grid-cols-2 gap-2 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-700 rounded-t-xl p-4 pointer-events-none">
                <p className="text-right font-semibold text-white">Price:</p>
                <p className="font-semibold text-white">${product.price}</p>
              </div>
{/* Stock */}
              <div className={"grid grid-cols-2 gap-2 bg-gray-800 p-4 pointer-events-none " +
                (product.countInStock === 0 ? "rounded-b-lg" : "")}>
                <p className="text-right font-semibold text-white">Status:</p>
                <p className="font-semibold text-white">
                  {product.countInStock === 0 ? 'Out of Stock' : 'In Stock'}</p>
              </div>
{/* Add to cart */}
              {product.countInStock > 0 &&
                <div className="bg-gray-700 grid grid-cols-2 items-center rounded-b-lg">
                  <div className="h-full w-full border-t border-gray-600 flex items-center justify-center">
                    <div className="flex  ">
                      <div className="font-semibold text-white relative self-stretch w-18 md:w-6 lg:w-18 pointer-events-none">
                        <p className="absolute block  md:hidden lg:block">Amount:</p>
                        <p className="absolute hidden md:block  lg:hidden">#:</p>
                      </div>
                      <select name="qty"
                        value={qty}
                        onChange={e => setQty(e.target.value)}
                        className="rounded mr-2 h-6">
                        {[...Array(product.countInStock).keys()].map(i => {
                          return (<option key={i+1} value={i+1}>{i+1}</option>)
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="bg-yellow-500  rounded-br-lg h-14 ">
                    <button onClick={addToCart} className={
                      "w-full h-full flex items-center justify-center rounded-br-lg " +
                      "text-center group relative  " +
                      "bg-gradient-to-br from-gray-700 via-gray-700 to-gray-500 " +
                      "buttonBorder transform duration-300 " +
                      "hover:from-gray-700 hover:via-gray-600 hover:to-gray-500  " }>
                      <FaCartArrowDown className={
                        "absolute left-0 right-0 bottom-0 top-0 my-auto mx-auto " +
                        "text-3xl text-yellow-400 " +
                        "opacity-0 transition-opacity ease-in-out duration-300 " +
                        "md:opacity-100 " +
                        "lg:opacity-0 " +
                        "xl:opacity-0 xl:group-hover:opacity-0 xl:text-4xl"} />
                      <p className={
                        "text-lg text-yellow-400 font-semibold whitespace-nowrap " +
                        "opacity-100 transition-opacity ease-in-out duration-300 " +
                        "md:opacity-0 " +
                        "lg:opacity-100 " +
                        "xl:opacity-100 xl:group-hover:opacity-100"}>
                        Add to Cart</p>
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}

/*
<div className="bg-gray-700 rounded-b-lg h-14 ">
  <button className={" w-full text-center bg-gradient-to-br h-full " +
    "from-gray-700 via-gray-700 to-gray-500 hover:bg-gradient-to-tl hover:to-gray-500 " +
    " rounded-br-lg p-4 transform " +
    "duration-300 hover:shadow-xl flex items-center justify-center " +
    "border-l border-r-2 border-t border-b-4 xl:border-0 xl:hover:border-t " +
    "xl:hover:border-l xl:hover:border-r-2 xl:hover:border-b-4 border-yellow-500 " +
    "xl:border-gray-700 xl:hover:border-yellow-500 group relative " +
    "hover:shadow-2xl"}>
    <FaCartArrowDown className={"text-3xl xl:text-4xl absolute left-0 right-0 " +
      "bottom-0 top-0 my-auto mx-auto transition duration-300 " +
      "opacity-0 md:opacity-100 lg:opacity-0 xl:opacity-100 xl:group-hover:opacity-0 text-yellow-400 "} />
    <p className={"whitespace-nowrap transition duration-300 text-yellow-300 " +
      "opacity-100 md:opacity-0 lg:opacity-100 xl:opacity-0 xl:group-hover:opacity-100 font-semibold text-lg "}>
      Add to Cart</p>
  </button>
</div>
*/

export default Product;
