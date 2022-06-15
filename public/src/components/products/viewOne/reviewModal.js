// Import basics
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// Import dispatch actions
import { createReview } from "../../../actions/productActions.js";
import { REVIEW_CREATE_RESET } from "../../../actions/types.js";
// Import components
import SelectEntry from "../../inputs/selectEntry.js";
import AreaEntry from "../../inputs/areaEntry.js";
import Spinner from "../../multipurpose/spinner.js";
import ErrorMessage from "../../multipurpose/errorMessage.js";
import { Button, Modal } from "@mantine/core";

const ReviewModal = ({ opened, setOpened }) => {
  // Set/get states
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [creationError, setCreationError] = useState("");
  const { loading, error } = useSelector((state) => state.productReview);
  const { product } = useSelector((state) => state.productDetails);

  // Submit the new review to the server and close the modal
  const dispatch = useDispatch();
  const reviewHandler = async (e) => {
    e.preventDefault();
    try {
      const review = { rating: Number(rating), comment };
      const success = await dispatch(createReview(product._id, review));
      if (success) setOpened(false);
    } catch (e) {
      setCreationError(e);
    }
  };

  // Clear any previous errors out
  useEffect(() => {
    dispatch({ type: REVIEW_CREATE_RESET });
  }, []);

  // Clear errors
  const timer = useRef(null);
  useEffect(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        dispatch({ type: REVIEW_CREATE_RESET });
        setCreationError("");
        timer.current = null;
      }, [5000]);
    }
  }, [dispatch, error]);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Add a review:`}
    >
      {loading ? (
        <Spinner extraClasses="mx-auto" />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : creationError ? (
        <ErrorMessage error={creationError} />
      ) : (
        <form onSubmit={reviewHandler} className="flex flex-col">
          <SelectEntry
            name="rating"
            value={rating}
            label="Rating:"
            labelColor="#111"
            onChange={(e) => setRating(e)}
            options={[
              { value: "1", label: "1 - Unusable" },
              { value: "2", label: "2 - Poor" },
              { value: "3", label: "3 - OK" },
              { value: "4", label: "4 - Good" },
              { value: "5", label: "5 - Excellent" },
            ]}
          />
          <AreaEntry
            name="comment"
            value={comment}
            label="Comment:"
            labelColor="#111"
            required={false}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className="mt-6 flex justify-evenly">
            <Button type="submit" color="green">
              Submit
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

export default ReviewModal;
