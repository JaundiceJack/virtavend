// Import basics
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import dispatch action
import { editProduct } from '../../actions/productActions.js';
// Import components
import TextEntry from '../inputs/textEntry.js';
import RadioEntry from '../inputs/radioEntry.js';
import Spinner from '../multipurpose/spinner.js';
import ErrorMessage from '../multipurpose/errorMessage.js';
import { Button, Modal } from '@mantine/core';

const EditProduct = ({ opened, setOpened, selectedProduct }) => {
  // Set form variables
  const [name, setName]
    = useState(selectedProduct && selectedProduct.name);
  const [category, setCategory]
    = useState(selectedProduct && selectedProduct.category);
  const [countInStock, setCountInStock]
    = useState(selectedProduct && selectedProduct.countInStock);

  // Get loading/error status
  const { error, loading }
    = useSelector(state => state.productEdit);

  // Fill form with selected product
  useEffect(() => {
    setName(selectedProduct && selectedProduct.name);
    setCategory(selectedProduct && selectedProduct.category);
    setCountInStock(selectedProduct && selectedProduct.countInStock);
  }, [selectedProduct])

  // Send the edits to the server
  const dispatch = useDispatch();
  const editHandler = e => {
    e.preventDefault();
    dispatch(editProduct({ _id: selectedProduct._id, name, category, countInStock }));
    setOpened(false);
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Editing ${name}...`}
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

export default EditProduct;
