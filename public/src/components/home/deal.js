import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDealProduct } from '../../actions/homeActions.js';
import Message from '../multipurpose/message.js';
import Spinner from '../multipurpose/spinner.js';
import Item from '../item/_item.js';

const Deal = ({ extraClasses }) => {
  const { product, loading, error } = useSelector(state => state.productDeal);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!product || !product.name) dispatch(getDealProduct());
  }, [dispatch, product])

  return (
    <div className="flex flex-col w-full rounded-lg overflow-hidden">

        <div className="flex flex-col">
          <div className="bg-header text-white font-semibold text-center p-4">
            Deal of the Month
          </div>
          {
            loading ? <Spinner extraClasses="my-auto " /> :
            error ? <Message error={error} extraClasses="my-auto " /> :
            <Item product={product} />
          }
        </div>

    </div>
  )
}

export default Deal;
