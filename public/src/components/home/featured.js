import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFeaturedProduct } from '../../actions/homeActions.js';
import Message from '../multipurpose/message.js';
import Spinner from '../multipurpose/spinner.js';
import Item from '../item/_item.js';

const Featured = ({ title, extraClasses }) => {
  const { product, loading, error } = useSelector(state => state.productFeatured);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!product || !product.name) dispatch(getFeaturedProduct());
  }, [dispatch, product])

  return (
    <div className="flex flex-col w-full rounded-t-lg rounded-b-xl overflow-hidden">
      {
        loading ? <Spinner extraClasses="my-auto " /> :
        error ? <Message error={error} extraClasses="my-auto " /> :
        <div className="flex flex-col">
          <div className="bg-header text-white font-semibold text-center p-4">
            Featured Product
          </div>
          <Item product={product} />
        </div>
      }
    </div>
  )
}

export default Featured;
