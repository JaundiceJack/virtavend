import Item from './item.js';
import { getProducts } from '../../actions/productActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Spinner from '../spinner.js';
import Message from '../message.js';

const Products = () => {
  const { products, loading, error } = useSelector(state => state.productList);
  const dispatch = useDispatch();
  useState(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className={"w-full h-full px-4 sm:px-12 my-7 mx-auto grid grid-cols-1 " +
                    "sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 " +
                    "gap-8 justify-items-center"}>
      { loading ? (<Spinner />) :
        error ? (<Message error={error} />) :
        products.map(product => {
          return <Item key={product._id} product={product} />
        })
      }

    </div>
  )
}

export default Products;
