// Import basics
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Import dispatch actions
import { getProducts } from '../../actions/productActions.js';
// Import components
import InfoPanel from '../multipurpose/infoPanel.js';
import ErrorMessage from '../multipurpose/errorMessage.js';
import Spinner from '../multipurpose/spinner.js';
import Header from '../multipurpose/header.js';
import AddProduct from './addProduct.js';
import EditProduct from './editProduct.js';
import DeleteProduct from './deleteProduct.js';
// Import icons
import { FaPlus, FaRegTrashAlt, FaEdit } from 'react-icons/fa';

const Products = ({ history }) => {
  // Store the clicked product to pass to the modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Set modal view states
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  // Get the redux variables
  const { products, loading, error }
    = useSelector(state => state.productList);

  return (
    <InfoPanel title="Products" extraClasses="h-full"
      contentClasses="h-full rounded-b-xl"
      contents={
        loading ? <Spinner /> :
        error ? <ErrorMessage error={error} /> :
        products.length === 0 ? <p>No products to view.</p> :
        <div className="flex flex-col">
          <div className={`grid grid-cols-4 items-center mb-2`}>
            <button  onClick={() => { setAddModal(true); } }
              title="Add a New Product"
              className={`col-span-full mx-auto sm:col-start-4 flex items-center justify-center
                rounded-full bg-gray-700 hover:bg-gray-500 h-10 w-36 group relative`}>
              <FaPlus className="absolute transform duration-150 opacity-0 group-hover:opacity-100" color="#ce3" />
              <p className="text-green-400 font-semibold whitespace-nowrap transform duration-150 opacity-100 group-hover:opacity-0">New Product</p>
            </button>
          </div>
          <div className={`h-10 w-full hidden sm:grid grid-cols-4 items-center mb-2`}>
            <p className="text-gray-100 font-semibold border-b-2 border-yellow-700 ">Product Name</p>
            <p className="text-gray-100 font-semibold border-b-2 border-yellow-600 ">Category</p>
            <p className="text-gray-100 font-semibold border-b-2 border-yellow-500 ">Quantity</p>
            <p className="text-gray-100 font-semibold border-b-2 border-yellow-400 ">Options</p>
          </div>

          {
            products.map((product, index) => {
              return (
                <div key={index} className={`grid sm:grid-cols-4 grid-cols-3 items-center
                  px-2 py-1 mx-1 my-1 gap-2 rounded-lg hover:bg-gray-500 `}>

                  <p className="sm:hidden inline text-gray-100 font-semibold">Product Name:</p>
                  <p className="text-gray-100 col-span-2 sm:col-span-1">{product.name}</p>

                  <p className="sm:hidden inline text-gray-100 font-semibold">Category:</p>
                  <p className="text-gray-100 col-span-2 sm:col-span-1">{product.category}</p>

                  <p className="sm:hidden inline text-gray-100 font-semibold">Quantity:</p>
                  <p className="text-gray-100 col-span-2 sm:col-span-1">{product.countInStock}</p>

                  <p className="sm:hidden inline text-gray-100 font-semibold  ">Options:</p>
                  <div className="flex flex-row items-center col-span-2 sm:col-span-1">
                    <button  onClick={() => {
                      setSelectedProduct(product); setEditModal(true); } }
                      title="Edit Product's Information"
                      className={`h-8 w-8 mr-2 flex items-center justify-center
                        rounded-full bg-gray-700 hover:bg-gray-600`}>
                      <FaEdit className="" color="#ec3" />
                    </button>
                    <button onClick={() => {
                      setSelectedProduct(product); setDeleteModal(true); } }
                      title="Remove Product"
                      className={`h-8 w-8 flex items-center justify-center
                        rounded-full bg-gray-700 hover:bg-gray-600`}>
                      <FaRegTrashAlt className="" color="#f55" />
                    </button>
                  </div>
                  {index !== products.length-1 && <div className="sm:hidden col-span-full my-2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>}
                </div>
              )
            })
          }

          <DeleteProduct opened={deleteModal}
            setOpened={setDeleteModal} selectedProduct={selectedProduct} />
          <EditProduct opened={editModal}
            setOpened={setEditModal} selectedProduct={selectedProduct} />
          <AddProduct opened={addModal}
            setOpened={setAddModal} />
        </div>
      }
    />
  )
}

export default Products;
