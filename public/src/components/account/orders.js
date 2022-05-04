// Import basics
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Import helper functions
import { formatDateMMDDYYYY } from '../../functions/dates.js';
// Import components
import Button from '../inputs/button.js';
import InfoPanel from '../multipurpose/infoPanel.js';

const Orders = ({ history }) => {
  // Grab user info from the state
  const { orders } = useSelector(state => state.ordersList);

  return (
    <div className="flex flex-col">
      <InfoPanel title="Orders" extraClasses="h-full" contentClasses="h-full"
        contents={
          orders.sort((a, b) => { return a.createdAt < b.createdAt }).map((order, index) => {
            return (
              <Link to={`/order/${order._id}`}
                className={
                  "text-white grid grid-cols-2 xl:grid-cols-4 my-2 gap-4 p-2 rounded opacity-80 hover:opacity-100 " +
                  (index % 2 === 0 ? "bg-gray-500" : "bg-gray-700")
                }>
                <p className="text-right font-semibold mr-2 ">Date Ordered:</p>
                <p>{formatDateMMDDYYYY(order.createdAt)}</p>
                <p className="text-right font-semibold mr-2 ">Total:</p>
                <p>${order.totalPrice.toFixed(2)}</p>
                <p className="text-right font-semibold mr-2 ">Payment Status:</p>
                <p>{order.isPaid ? "Paid in Full" : "Not yet Paid"}</p>
                <p className="text-right font-semibold mr-2 ">Delivery Status:</p>
                <p>{order.isDelivered ? "Delivered" : "Not yet Delivered"}</p>

              </Link>
            )
          })
        }  />
      <Button text="Go to Cart" position="br"
        gradientDirection="bl" onClick={() => history.push('/cart')} />

    </div>
  )
}

export default Orders;
