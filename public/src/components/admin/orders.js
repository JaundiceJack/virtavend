// Import basics
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Import components
import InfoPanel from '../multipurpose/infoPanel.js';
import ErrorMessage from '../multipurpose/errorMessage.js';
import Spinner from '../multipurpose/spinner.js';
import Header from '../multipurpose/header.js';
// import EditOrder from './editOrder.js';
// import DeleteOrder from './deleteOrder.js';
import { Pagination } from '@mantine/core';
// Import icons
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';

const Orders = ({ history }) => {
  // Store the clicked order to pass to the modals
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activePage, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  // Get the redux variables
  const { orders, loading, error }
    = useSelector(state => state.ordersManagement);

  return (
    <InfoPanel title="Orders"
      extraClasses="h-full "
      contentClasses="h-full rounded-b-xl"
      contents={
        loading ? <Spinner /> :
        error ? <ErrorMessage error={error} /> :
        orders.length === 0 ? <p>No orders to view.</p> :
        <div className="flex flex-col">
          <div className={`h-10 w-full hidden sm:grid grid-cols-4
            items-center mb-2`}>
            <p className="text-gray-100 font-semibold border-b-2 border-yellow-700 ">Customer Name</p>
            <p className="text-gray-100 font-semibold border-b-2 border-yellow-600 ">Order Total</p>
            <p className="text-gray-100 font-semibold border-b-2 border-yellow-500 ">Payment Status</p>
            <p className="text-gray-100 font-semibold border-b-2 border-yellow-400 ">Options</p>
          </div>
          {
            orders.slice((activePage - 1) * perPage, activePage * perPage).map((order, index) => {
              return (
                <div key={index} className={`grid sm:grid-cols-4 grid-cols-3 items-center
                  px-2 py-1 mx-1 my-1 gap-2 rounded-lg hover:bg-gray-500 `}>

                  <p className="sm:hidden inline text-gray-100 font-semibold  ">Customer Name:</p>
                  <p className="text-gray-100 col-span-2 sm:col-span-1 ">{order.user.name}</p>

                  <p className="sm:hidden inline text-gray-100 font-semibold ">Order Total:</p>
                  <a href="#"
                    className="text-gray-100 col-span-2 sm:col-span-1 break-words">${order.totalPrice.toFixed(2)}</a>

                  <p className="sm:hidden inline text-gray-100 font-semibold ">Payment Status:</p>
                  <p className="text-gray-100 col-span-2 sm:col-span-1">{order.isPaid ? 'Paid in Full' : 'Not Yet Paid'}</p>

                  <p className="sm:hidden inline text-gray-100 font-semibold  ">Options:</p>
                  <div className="flex flex-row items-center col-span-2 sm:col-span-1">

                  </div>

                  {index !== orders.length-1 && <div className="sm:hidden col-span-full my-2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>}

                </div>
              )
            })
          }

          <Pagination className="mx-auto mt-4"
            page={activePage}
            onChange={setPage}
            total={Math.ceil(orders.length/perPage)} />


        </div>
      }
    />
  )
}

export default Orders;
