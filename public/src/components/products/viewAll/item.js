import Rating from './rating';
import Price from './price';
import Title from './title';
import { Link } from 'react-router-dom';

const Item = ({product}) => {
  return (
    <Link to={"/merch/"+product._id} className="w-84 h-84 rounded-xl bg-white flex flex-col transition duration-300 hover:shadow-2xl">
      <img src={product.image} alt="" className="mx-auto h-72 rounded-t-xl"/>
      <div className="flex flex-row group h-full">
        <Title text={product.name} />
        <Rating value={product.rating} numReviews={product.numReviews} />
        <Price value={product.price.toFixed(2)} />
      </div>
    </Link>
  )
}

export default Item;
