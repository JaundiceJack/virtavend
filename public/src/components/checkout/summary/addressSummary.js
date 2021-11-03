import InfoPanel from '../../infoPanel.js';

const AddressSummary = ({ shippingAddress, billingAddress, showDelivery=false, deliveryStatus, deliveredOn }) => {
  return (
    <InfoPanel title="Address"
      contents={
        ( <>
          <div className="grid grid-cols-4 gap-x-2 mb-4">
            <p className="text-white mr-1 text-right">Shipping:</p>
            <p className="text-white col-span-3">{shippingAddress && shippingAddress.address}</p>
            <p className="text-white col-span-3 col-start-2">
              {shippingAddress && shippingAddress.city}{" "}
              {shippingAddress && shippingAddress.state && shippingAddress.state + ", "}
              {shippingAddress && shippingAddress.zip}{" "}
              {shippingAddress && shippingAddress.country}
            </p>
          </div>
          <div className={"grid grid-cols-4 gap-x-2 "+(showDelivery && "mb-4")}>
            <p className="text-white mr-1 text-right">Billing:</p>
            <p className="text-white col-span-3">{billingAddress && billingAddress.address}</p>
            <p className="text-white col-span-3 col-start-2">
              {billingAddress && billingAddress.city}{" "}
              {billingAddress && billingAddress.state && billingAddress.state + ", "}
              {billingAddress && billingAddress.zip}{" "}
              {billingAddress && billingAddress.country}
            </p>
          </div>
          {showDelivery &&
            <div className="grid grid-cols-4 gap-x-2">
              <p className="text-white mr-1 text-right">Delivery Status:</p>
              <p className="text-white col-span-3 self-end">{deliveryStatus ? `Delivered on ${deliveredOn}` : "On its way"}</p>
            </div>
          }
        </> )
      }
    />
  )
}

export default AddressSummary;
