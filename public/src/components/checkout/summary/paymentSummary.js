import Header from '../../header.js';

const PaymentSummary = ({ order }) => {
  return (
    <div className="flex flex-col">
      <Header text="Payment Summary" />
      <div className="grid grid-cols-2">
        <div className="grid grid-cols-2 gap-x-2 bg-gray-700 p-4 border-b border-r border-gray-600">
          <p className="text-right font-semibold text-white">Total:</p>
          <p className="font-semibold text-white">${order.totalPrice.toFixed(2)}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-2 bg-gray-700 p-4 border-b border-gray-600">
          <p className="text-right font-semibold text-white">Taxes:</p>
          <p className="font-semibold text-white">${order.taxPrice.toFixed(2)}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-2 bg-gray-700 p-4 border-r border-gray-600">
          <p className="text-right font-semibold text-white">Method:</p>
          <p className={"font-semibold text-white capitalize"}>{order.paymentMethod}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-2 bg-gray-700 p-4">
          <p className="text-right font-semibold text-white">Shipping:</p>
          <p className="font-semibold text-white">${order.shippingPrice.toFixed(2)}</p>
        </div>
        <div className="col-span-2 bg-footer flex flex-row justify-center p-4 rounded-b-xl border-t border-gray-600">
          <p className="text-right font-semibold text-white mr-2">Status:</p>
          <p className={"font-semibold " + (order.isPaid ? "text-green-300" : "text-red-300")}>{order.isPaid ? "Paid" : "Not Paid"}</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentSummary;
