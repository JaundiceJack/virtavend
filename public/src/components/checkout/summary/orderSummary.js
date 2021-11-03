import AddressSummary from './addressSummary.js';
import ItemsSummary from './itemsSummary.js';
import ConfirmationSummary from './confirmationSummary.js';
import Header from '../../header.js';
import PayPalSummary from './paypalSummary.js';

const OrderSummary = ({ order, onPaySuccess, loadingPay, sdkReady }) => {
  return (
    <div className={"w-full h-full flex flex-col items-center"}>
      <Header text="Order Details" />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col">
          <ConfirmationSummary id={order._id} />
          <ItemsSummary items={order.orderItems} />
        </div>
        <div className="flex flex-col">
          <AddressSummary
            shippingAddress={order.shippingAddress}
            billingAddress={order.shippingAddress}
            showDelivery={true}
            delivery={order.isDelivered}
            deliveredOn={order.deliveredAt}
            />
            {!order.isPaid &&
              <PayPalSummary total={order.totalPrice} onSuccess={onPaySuccess} loadingPay={loadingPay} sdkReady={sdkReady} />
            }
        </div>
      </div>
    </div>
  )
}

export default OrderSummary;
