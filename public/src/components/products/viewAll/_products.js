import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../actions/productActions.js';
import Item    from '../../item/_item.js';
import Spinner from '../../multipurpose/spinner.js';
import Message from '../../multipurpose/message.js';

const Products = () => {
  const { products, loading, error } = useSelector(state => state.productList);
  const dispatch = useDispatch();
  useState(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={
      "w-full h-full px-4 sm:px-12 my-7 mx-auto grid grid-cols-1 " +
      "sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 " +
      "gap-8 justify-items-center"
    }>
      { loading ? (<Spinner />) :
        error ? (<Message error={error} />) :
        products.map(product => {
          return <Item key={product._id}
            product={product}
            extraClasses="w-84 h-84 rounded-xl "
          />
        })
      }
    </div>
  )
}

export default Products;
