import InfoPanel from '../../multipurpose/infoPanel.js';

const AddressSummary = ({ shippingAddress, showDelivery=false, deliveryStatus, deliveredOn }) => {
  return (
    <InfoPanel title="Address"
      extraClasses="h-full"
      contentClasses="h-full rounded-b-xl sm:rounded-br-xl sm:rounded-bl-none"
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
