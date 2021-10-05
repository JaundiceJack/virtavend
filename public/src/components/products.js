import Item from './item.js';
import { getProducts } from '../actions/productActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ImSpinner9 } from 'react-icons/im';

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
      { loading ?
          (<ImSpinner9 className="spin text-4xl col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 2xl:col-span-3 self-center" />) :
        error ?
          (<h3>{error}</h3>) :
        products.map(product => {
          return <Item key={product._id} product={product} />
        })
      }

    </div>
  )
}

export default Products;
