import Rating from './rating';
import Price from './price';
import Title from './title';
import { Link } from 'react-router-dom';

const Item = ({ product, extraClasses="" }) => {
  return (
    <Link to={"/merch/"+product._id}
      className={
        "bg-white flex flex-col rounded-b-xl " +
        "transition duration-300 hover:shadow-2xl " + extraClasses
      }>
      <img src={product.image} alt="" className="mx-auto h-72 rounded-t-xl rounded-b-xl"/>
      <div className="flex flex-row group h-full rounded-b-xl">
        <Title text={product && product.name} />
        <Rating value={product.rating} numReviews={product && product.numReviews} />
        <Price value={product.price && product.price.toFixed(2)} />
      </div>
    </Link>
  )
}

export default Item;
