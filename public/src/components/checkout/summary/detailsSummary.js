import AddressSummary from './addressSummary.js';
import ItemsSummary from './itemsSummary.js';
import Header from '../../header.js';

const DetailsSummary = ({ cart }) => {
  return (
    <div className={"w-full h-full flex flex-col items-center justify-evenly"}>
      <Header text="Review Details" />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col">
          <ItemsSummary items={cart.items} />
        </div>
        <div className="flex flex-col">
          <AddressSummary
            shippingAddress={cart.shippingAddress}
            billingAddress={cart.shippingAddress} />
        </div>
      </div>
    </div>
  )
}

export default DetailsSummary;
