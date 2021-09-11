import Product from './product.js';
import products from '../products.js';

const Products = () => {
  // const products = useSelector(state => state.products);

  return (
    <div className={"w-full px-4 sm:px-12 my-7 mx-auto grid grid-cols-1 " +
                    "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3"}>
      {products.map(product => {
        return <Product product={product} />
      })}
    </div>
  )
}

export default Products;
