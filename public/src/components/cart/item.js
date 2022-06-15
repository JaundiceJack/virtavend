// Import basics
import { Link } from "react-router-dom";
// Import icons
import { FaRegTrashAlt } from "react-icons/fa";

const Item = ({ item, index, selectQty, removeItem }) => {
  return (
    <div
      key={index}
      className={
        (index % 2 === 0 ? "bg-gray-800 " : "bg-gray-700 ") +
        " px-4 py-4 grid grid-cols-2 gap-y-4 sm:gap-y-0 sm:grid-cols-5"
      }
    >
      <Link
        to={`/merch/${item.product}`}
        className={`h-20 w-20 p-1 bg-white rounded self-center 
                    justify-self-center sm:justify-self-start`}
      >
        <img src={item.image} className="h-18 mx-auto" alt="Product" />
      </Link>
      <div className="flex flex-col sm:col-span-2 self-center">
        <Link
          to={`/merch/${item.product}`}
          className="text-white font-semibold text-xl"
        >
          {item.name}
        </Link>
        <p className="text-white font-semibold text-xl">
          ${item.price.toFixed(2)}
        </p>
      </div>
      <select
        name="qty"
        value={item.qty}
        onChange={selectQty}
        className={`rounded-lg mr-2 w-10 h-8 text-lg self-center 
                    justify-self-center sm:justify-self-end`}
      >
        {[...Array(item.countInStock).keys()].map((i) => {
          return (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          );
        })}
      </select>
      <button
        title="Remove from cart"
        onClick={removeItem}
        className={`transform duration-300 hover:scale-105 
                    justify-self-start sm:justify-self-center`}
      >
        <FaRegTrashAlt className="text-2xl text-red-300" />
      </button>
    </div>
  );
};

export default Item;
