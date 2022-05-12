// Import basics
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("Web");
  const [category, setCategory] = useState("Shirt");
  const [countInStock, setCountInStock] = useState(0);

  const { loading, error } = useSelector(state => state.productAdd);

  const dispatch = useDispatch();
  const editHandler = e => {
    e.preventDefault();
    dispatch(addProduct({ name, category, countInStock }));
    setOpened(false);
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Adding new product...`}
    >
      {
        loading ? <Spinner /> :
        error ? <ErrorMessage error={error} /> :
        <form onSubmit={editHandler} className="flex flex-col">
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
            label="Description:"
            labelColor="#111"
            onChange={e => setDescription(e.target.value)}
          />
          <ImageEntry />
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
              Apply
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
