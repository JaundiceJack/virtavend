import { FaCartArrowDown } from 'react-icons/fa';
import Button from '../../inputs/button.js'

const AddToCart = ({ amount, qty, setQty, onAdd }) => {
  return (
    <div className="grid grid-cols-2 items-center ">
      <div className="h-full w-full border-t border-gray-600 flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-800 to-gray-600 rounded-bl-xl">
        <div className="flex  ">
          <div className="font-semibold text-white relative self-stretch w-18 md:w-6 lg:w-18 pointer-events-none mr-2">
            <p className="absolute block  md:hidden lg:block">Amount:</p>
            <p className="absolute hidden md:block  lg:hidden">#:</p>
          </div>
          <select name="qty"
            value={qty}
            onChange={e => setQty(e.target.value)}
            className="rounded mr-2 h-6">
            {[...Array(amount).keys()].map(i => {
              return (<option key={i+1} value={i+1}>{i+1}</option>)
            })}
          </select>
        </div>
      </div>
      <Button text="Add to Cart"
        color="yellow"
        position="br" smallPosition="br"
        gradientDirection="bl"
        onClick={onAdd} />

    </div>
  )
}

/*
<div className="bg-yellow-500  rounded-br-lg h-14 ">
  <button onClick={onAdd} className={
    "w-full h-full flex items-center justify-center rounded-br-lg " +
    "text-center group relative  " +
    "bg-gradient-to-br from-gray-700 via-gray-700 to-gray-500 " +
    "buttonBorder transform duration-300 " +
    "hover:from-gray-700 hover:via-gray-600 hover:to-gray-500  " }>
    <FaCartArrowDown className={
      "absolute left-0 right-0 bottom-0 top-0 my-auto mx-auto " +
      "text-3xl text-yellow-400 " +
      "opacity-0 transition-opacity ease-in-out duration-300 " +
      "md:opacity-100 " +
      "lg:opacity-0 " +
      "xl:opacity-0 xl:group-hover:opacity-0 xl:text-4xl"} />
    <p className={
      "text-lg text-yellow-400 font-semibold whitespace-nowrap " +
      "opacity-100 transition-opacity ease-in-out duration-300 " +
      "md:opacity-0 " +
      "lg:opacity-100 " +
      "xl:opacity-100 xl:group-hover:opacity-100"}>
      Add to Cart</p>
  </button>
</div>
*/

export default AddToCart;
