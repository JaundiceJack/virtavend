// Import icons
import { FaCartArrowDown } from "react-icons/fa";
// Import components
import Button from "../../inputs/button.js";

const AddToCart = ({ amount, qty, setQty, onAdd }) => {
  return (
    <div className="grid grid-cols-2 items-center ">
      <div
        className={`h-full w-full border-t border-gray-600 
                    flex items-center justify-center bg-gradient-to-br 
                    from-gray-800 via-gray-800 to-gray-600 rounded-bl-xl`}
      >
        <div className="flex  ">
          <div
            className={`font-semibold text-white relative self-stretch 
                        w-18 md:w-6 lg:w-18 pointer-events-none mr-2`}
          >
            <p className="absolute block md:hidden lg:block">Amount:</p>
            <p className="absolute hidden md:block lg:hidden">#:</p>
          </div>
          <select
            name="qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="rounded mr-2 h-6"
          >
            {[...Array(amount).keys()].map((i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <Button
        text="Add to Cart"
        color="yellow"
        position="br"
        smallPosition="br"
        gradientDirection="bl"
        onClick={onAdd}
      />
    </div>
  );
};

export default AddToCart;
