import { Link } from 'react-router-dom';

const Item = ({ item, index }) => {
  return (
    <div key={index} className={
      (index % 2 === 0 ? "bg-gray-600 " : "bg-gray-800 ") +
      "px-4 py-4 grid grid-cols-2 sm:grid-cols-4 " +
      "gap-x-8 gap-y-4 sm:gap-y-0 rounded-lg mb-4"}>
      <Link to={`/merch/${item.product}`}
        className={"h-20 w-20 p-1 self-center justify-self-center " +
          "sm:justify-self-start bg-white rounded"}>
        <img src={item.image} className="h-18 mx-auto" alt="Product" />
      </Link>
      <div className="flex flex-col sm:col-span-2 self-center">
        <Link to={`/merch/${item.product}`}
          className="text-white font-semibold text-xl">
          {item.name}
        </Link>
        <p className="text-white font-semibold text-xl">
          ${item.price.toFixed(2)}
        </p>
      </div>
      <div className={"h-10 w-10 flex items-center justify-center " +
        "self-center justify-self-center sm:justify-self-end " +
        "col-span-2 sm:col-span-1 bg-gray-700 rounded-lg "}>
        <p className="text-white font-bold text-xl ">
          {item.qty}
        </p>
      </div>
    </div>
  )
}

export default Item;
