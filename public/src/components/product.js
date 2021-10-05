import { Link } from 'react-router-dom';
import RatingB from './ratingB';
import { useSelector } from 'react-redux';

const Product = ({ match }) => {
  // const products = useSelector(state => state.products);
  const products = useSelector(state => state.productList.products);
  const product = products.find(item => item._id == match.params.id);

  return (
    <div className={"w-full px-4 sm:px-12 my-7 mx-auto"}>
      <Link to="/merch">
        <div className={"p-2 bg-yellow-400 rounded-lg text-white " +
                   "font-semibold shadow transform duration-300 " +
                   "hover:scale-110 w-min whitespace-nowrap"}>
          Go Back
        </div>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
        <div className="p-4 bg-white rounded-lg sm:row-span-2">
          <img src={product.image} alt={product.name} className="col-start-2"/>
        </div>
        <div>
          <h3 className="font-bold text-black text-3xl capitalize">{product.name}</h3>
          <div className="h-px my-2 bg-gray-400 w-full" />
          <RatingB value={product.rating} numReviews={product.numReviews} />
          <div className="h-px my-2 bg-gray-400 w-full" />
          <h5>{product.description}</h5>
          <div className="h-px my-2 bg-gray-400 w-full" />
        </div>
        <div className="w-full sm:w-4/5 md:w-3/4 2xl:w-1/2 self-start justify-self-center">
          <div className="grid grid-cols-2 gap-2 bg-gray-700 rounded-t-lg p-4">
            <p className="text-right font-semibold text-blue-100">Price:</p>
            <p className="font-semibold text-blue-100">${product.price}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-gray-600 p-4">
            <p className="text-right font-semibold text-blue-100">Status:</p>
            <p className="font-semibold text-blue-100">{product.stock === 0 ? 'Out of Stock' : 'In Stock'}</p>
          </div>
          <div className="bg-gray-700 rounded-b-lg">
            <button className="w-full text-center bg-gray-700 font-bold text-yellow-100 rounded-lg p-4 transform duration-150 hover:scale-105">Add to Cart</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Product;
