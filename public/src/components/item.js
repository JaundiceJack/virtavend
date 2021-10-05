import RatingA from './ratingA';
import Price from './price';
import Title from './title';
import { Link } from 'react-router-dom';

const Item = ({product}) => {
  return (
    <Link to={"/merch/"+product._id} className="w-84 h-84 rounded-xl bg-white flex flex-col transition duration-300 hover:shadow-2xl">
      <img src={product.image} alt="" className="mx-auto h-72 rounded-t-xl"/>
      <div className="flex flex-row ">
        <Title text={product.name} />
        <RatingA value={product.rating} numReviews={product.numReviews} />
        <Price value={product.price} />
      </div>
    </Link>
  )
}

export default Item;
