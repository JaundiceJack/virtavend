import Message from '../../message.js';
import Header from '../../header.js';
import Button from '../../inputs/button.js';

const TotalSummary = ({ submitOrder,
                        error,
                        method,
                        itemsPrice,
                        shippingPrice,
                        taxPrice,
                        totalPrice }) => {
  return (
    <div className="flex flex-col">
      <Header text="Total Summary" />
      <div className="grid grid-cols-2">
        <div className="grid grid-cols-2 gap-x-2 bg-gray-700 p-4 border-b border-r border-gray-600">
          <p className="text-right font-semibold text-white">Total:</p>
          <p className="font-semibold text-white">
            ${totalPrice}</p>
          {error && <Message error={error} extraClasses="mt-4"/>}
        </div>
        <div className="grid grid-cols-2 gap-x-2 bg-gray-700 p-4 border-b border-gray-600">
          <p className="text-right font-semibold text-white">Taxes:</p>
          <p className="font-semibold text-white">${taxPrice}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-2 bg-gray-700 p-4 border-r border-gray-600">
          <p className="text-right font-semibold text-white">Method:</p>
          <p className="font-semibold text-white capitalize">{method}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-2 bg-gray-700 p-4">
          <p className="text-right font-semibold text-white">Shipping:</p>
          <p className="font-semibold text-white">${shippingPrice}</p>
        </div>

        <Button text="Complete Purchase" color="green"
          disabled={itemsPrice === 0.00}
          onClick={submitOrder} extraClasses="col-span-2"/>
      </div>
    </div>
  )
}

export default TotalSummary;
