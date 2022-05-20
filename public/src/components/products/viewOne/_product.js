import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../../actions/productActions.js';
import Details from './details';
import Title from './title';
import Rating from './rating';
import Price from './price';
import Stock from './stock';
import Button from '../../inputs/button.js';
import Image from './image';
import AddToCart from './addToCart';
import Spinner from '../../multipurpose/spinner.js';
import Message from '../../multipurpose/message.js';
import Tabs from './tabs.js';
import Reviews from './reviews.js';
// Import icons
import { FaPlus, FaRegTrashAlt, FaEdit } from 'react-icons/fa';

const Product = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const { product, loading, error } = useSelector(state => state.productDetails);

  const [tab, setTab] = useState('overview');

  const addToCart = () => { history.push(`/cart/${match.params.id}?qty=${qty}`) }
  const onBack = () => { history.push('/merch') };

  const dispatch = useDispatch();
  useEffect(() => dispatch(getProduct(match.params.id)), [dispatch, match]);

  return (
    <div className={"w-full h-full px-4 sm:px-12 my-7 mx-auto " +
      "flex flex-col items-center justify-center"}>
      <div className="w-full h-full flex items-center justify-center">
        { loading ? (<Spinner />) :
          error ? (<Message error={error} />) :
          <div className={`grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3
            2xl:mt-7`}>
            {/* Product Info */}
            <div className={`flex flex-col col-span-1 md:col-span-2 2xl:-mt-10
              mb-8 2xl:mb-0`}>
              <Button text="To Merch"
                color="yellow"
                position="t"
                smallPosition="t"
                gradientDirection="tl"
                onClick={onBack}
                extraClasses="w-28 h-12"/>
              <div className={`grid grid-cols-1 sm:grid-cols-2 rounded-b-lg
                rounded-tr-xl bg-gray-700`}>
                <Image image={product.image} name={product.name} />
                <div className="flex flex-col sm:row-span-2">
                  <Title title={product.name} />
                  <Tabs tab={tab} setTab={setTab} />
                  {
                    tab === 'reviews' ?
                    <Reviews reviews={product.reviews} totalReviews={product.numReviews} averageReview={product.rating}/> :
                    <Details details={product.description} />
                  }
                </div>
              </div>
            </div>
            {/* Product Actions */}
            <div className={`w-full col-span-2 2xl:col-span-1 md:w-3/4
              3xl:w-3/5 self-start justify-self-center`}>
              <Price price={product.price} />

              <div className={`h-px w-full bg-gradient-to-r from-gray-700
                via-gray-600 to-gray-700`} />

              <Stock amount={product.countInStock} />
              {product.countInStock > 0 &&
                <AddToCart amount={product.countInStock}
                  qty={qty}
                  setQty={setQty}
                  onAdd={() => addToCart()} />
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Product;
