// Import basics
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// Import dispatch action
import { addProduct } from '../../actions/productActions.js';
import { PRODUCT_CREATE_RESET } from '../../actions/types.js';
// Import components
import TextEntry from '../inputs/textEntry.js';
import RadioEntry from '../inputs/radioEntry.js';
import PriceEntry from '../inputs/priceEntry.js';
import AreaEntry from '../inputs/areaEntry.js';
import ImageEntry from '../inputs/imageEntry.js';
import Spinner from '../multipurpose/spinner.js';
import ErrorMessage from '../multipurpose/errorMessage.js';
import { Button, Modal } from '@mantine/core';

const AddProduct = ({ opened, setOpened }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(10);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [brand, setBrand] = useState("Web");
  const [category, setCategory] = useState("Shirt");
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [creationError, setCreationError] = useState("");

  const { loading, error } = useSelector(state => state.productAdd);

  // Submit the new product to the server and close the modal
  const dispatch = useDispatch();
  const addHandler = async e => {
    e.preventDefault();
    try {
      // Upload the product image first
      const imagePath = await upload();
      const product = {
        name,  price, description,
        brand, category, countInStock,
        image: imagePath,
      }
      dispatch(addProduct(product));
      setOpened(false);
    } catch (e) { setCreationError(e); }
  }

  // Send the image file to the server and wait for a response
  const upload = () => {
    return new Promise(async (resolve, reject) => {
      setUploading(true);
      try {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.post('/api/upload', file, config);
        // data returned is path to image
        setUploading(false);
        resolve(data);
      } catch (e) {
        setUploading(false);
        reject(e);
      }
    })
  }

  // Place the image in the state on file drop
  const getFile = files => {
    const formData = new FormData();
    formData.append('image', files[0]);
    setFile(formData);
  }

  // Clear errors
  const timer = useRef(null);
  useEffect(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        setCreationError("");
        timer.current = null;
      }, [5000]);
    }
  }, [dispatch]);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Adding new product...`}
    >
      {
        loading ? <Spinner /> :
        error ? <ErrorMessage error={error} /> :
        creationError ? <ErrorMessage error={creationError} /> :
        <form onSubmit={addHandler} className="flex flex-col">
          <TextEntry
            name="name"
            value={name}
            label="Name:"
            labelColor="#111"
            onChange={e => setName(e.target.value)} />

          <PriceEntry
            name="price"
            value={price}
            label="Price:"
            labelColor="#111"
            onChange={e => setPrice(e)} />

          <AreaEntry
            name="description"
            value={description}
            label="Details:"
            labelColor="#111"
            onChange={e => setDescription(e.target.value)} />

          <ImageEntry
            uploading={uploading}
            setUploading={setUploading}
            onUpload={getFile}
            file={file} />

          <TextEntry
            name="brand"
            value={brand}
            label="Brand:"
            labelColor="#111"
            onChange={e => setBrand(e.target.value)} />

          <TextEntry
            name="category"
            value={category}
            label="Category:"
            labelColor="#111"
            onChange={e => setCategory(e.target.value)} />

          <TextEntry
            name="countInStock"
            value={countInStock}
            label="Count In Stock:"
            labelColor="#111"
            onChange={e => setCountInStock(e.target.value)} />

          <div className="mt-6 flex justify-evenly">
            <Button type="submit" color="green" >
              Add
            </Button>
            <Button color="red" onClick={
              () => setOpened(false)}>
              Cancel
            </Button>
          </div>
        </form>
      }
    </Modal>
  )
}

export default AddProduct;
