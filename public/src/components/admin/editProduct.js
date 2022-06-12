// Import basics
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// Import dispatch action
import { editProduct } from "../../actions/productActions.js";
// Import components
import TextEntry from "../inputs/textEntry.js";
import Spinner from "../multipurpose/spinner.js";
import PriceEntry from "../inputs/priceEntry.js";
import AreaEntry from "../inputs/areaEntry.js";
import ImageEntry from "../inputs/imageEntry.js";
import SelectEntry from "../inputs/selectEntry.js";
import ErrorMessage from "../multipurpose/errorMessage.js";
import { Button, Modal } from "@mantine/core";

const EditProduct = ({ opened, setOpened, selectedProduct }) => {
  // Set form variables
  const [name, setName] = useState(selectedProduct && selectedProduct.name);
  const [price, setPrice] = useState(selectedProduct && selectedProduct.price);
  const [description, setDescription] = useState(
    selectedProduct && selectedProduct.description
  );
  const [file, setFile] = useState(null);
  const [brand, setBrand] = useState(selectedProduct && selectedProduct.brand);
  const [category, setCategory] = useState(
    selectedProduct && selectedProduct.category
  );
  const [countInStock, setCountInStock] = useState(
    selectedProduct && selectedProduct.countInStock
  );
  const [uploading, setUploading] = useState(false);
  const [creationError, setCreationError] = useState("");
  // Get loading/error status
  const { error, loading } = useSelector((state) => state.productEdit);

  // TODO: extend category system to add/remove custom ones
  // Define categories
  const categories = [
    { label: "Shirt", value: "shirt" },
    { label: "Device", value: "device" },
    { label: "Trinket", value: "trinket" },
  ];

  // TODO: Get the product's current image(s) too
  // Fill form with selected product
  useEffect(() => {
    setName(selectedProduct && selectedProduct.name);
    setPrice(selectedProduct && selectedProduct.price);
    setDescription(selectedProduct && selectedProduct.description);
    setBrand(selectedProduct && selectedProduct.brand);
    setCategory(selectedProduct && selectedProduct.category);
    setCountInStock(selectedProduct && selectedProduct.countInStock);
  }, [selectedProduct]);

  // Send the edits to the server
  const dispatch = useDispatch();
  const editHandler = async (e) => {
    e.preventDefault();
    try {
      // Upload the product image first
      const imagePath = file ? await upload() : null;
      const product = {
        _id: selectedProduct._id,
        name,
        price,
        description,
        brand,
        category,
        countInStock,
        image: imagePath,
      };
      const success = await dispatch(editProduct(product));
      if (success) setOpened(false);
    } catch (e) {
      setCreationError(e);
    }
  };

  // Send the image file to the server and wait for a response
  const upload = () => {
    return new Promise(async (resolve, reject) => {
      setUploading(true);
      try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post("/api/upload", file, config);
        // data returned is path to image
        setUploading(false);
        resolve(data);
      } catch (e) {
        setUploading(false);
        reject(e);
      }
    });
  };

  // Place the image in the state on file drop
  const getFile = (files) => {
    const formData = new FormData();
    formData.append("image", files[0]);
    setFile(formData);
  };

  // Clear errors
  const timer = useRef(null);
  useEffect(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        //dispatch({ type: PRODUCT_CREATE_RESET });
        setCreationError("");
        timer.current = null;
      }, [5000]);
    }
  }, [dispatch]);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Editing ${name}...`}
    >
      {loading ? (
        <Spinner extraClasses="mx-auto my-2" />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : creationError ? (
        <ErrorMessage error={creationError} />
      ) : (
        <form onSubmit={editHandler} className="flex flex-col">
          <TextEntry
            name="name"
            value={name}
            label="Name:"
            labelColor="#111"
            onChange={(e) => setName(e.target.value)}
          />

          <PriceEntry
            name="price"
            value={price}
            label="Price:"
            labelColor="#111"
            onChange={(e) => setPrice(e)}
          />

          <AreaEntry
            name="description"
            value={description}
            label="Details:"
            labelColor="#111"
            onChange={(e) => setDescription(e.target.value)}
          />

          <ImageEntry
            uploading={uploading}
            setUploading={setUploading}
            onUpload={getFile}
            file={file}
          />

          <TextEntry
            name="brand"
            value={brand}
            label="Brand:"
            labelColor="#111"
            onChange={(e) => setBrand(e.target.value)}
          />

          <SelectEntry
            name="category"
            value={category}
            label="Category:"
            labelColor="#111"
            onChange={(e) => setCategory(e)}
            options={categories}
          />

          <TextEntry
            name="countInStock"
            value={countInStock}
            label="Count In Stock:"
            labelColor="#111"
            onChange={(e) => setCountInStock(e.target.value)}
          />

          <div className="mt-6 flex justify-evenly">
            <Button type="submit" color="green">
              Apply
            </Button>
            <Button color="red" onClick={() => setOpened(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EditProduct;
