// Import basics
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// Import dispatch actions
import { validateToken } from "../../../actions/userActions.js";
import { createReview } from "../../../actions/productActions.js";
// Import helper functions
import { capitalize } from "../../../functions/strings.js";
// Import components
import ReviewModal from "./reviewModal.js";
// Import Icons
import {
  FaStarHalfAlt,
  FaStar,
  FaRegStar,
  FaPlus,
  FaRegTrashAlt,
  FaEdit,
} from "react-icons/fa";

const Reviews = ({ reviews, totalReviews, averageReview }) => {
  // Set the modal's show/hide state
  const [addModal, setAddModal] = useState(false);

  // Check for user login and valid token before opening modal
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  const dispatch = useDispatch();
  const reviewClick = async () => {
    if (!userInfo) history.push("/login");
    else {
      const validToken = await dispatch(validateToken(userInfo.token));
      if (!validToken) history.push("/login");
      else setAddModal(true);
    }
  };

  // TODO: Get rid of this and make a component for it
  const stars = [1, 2, 3, 4, 5];

  return (
    <div
      className={`bg-gray-700 p-3 sm:rounded-bl-none
      rounded-bl-lg rounded-br-lg flex-grow`}
    >
      <div
        style={{ maxHeight: 32 + "rem" }}
        className={`h-full border-2 border-gray-500 rounded-lg rounded-br-none
          flex flex-col `}
      >
        <div
          className={`flex flex-row items-center justify-center bg-gray-700
          rounded-t p-4 relative h-32 sm:h-28`}
        >
          <div
            className={`absolute sm:left-4 left-0 right-0 flex
            sm:flex-row flex-col items-center w-full`}
          >
            <div
              className={`flex flex-row font-semibold text-yellow-400
              justify-center bg-gray-600 m-2 p-4 rounded-lg`}
            >
              {stars.map((star, i) => {
                return averageReview >= i + 1 ? (
                  <FaStar key={i} />
                ) : averageReview >= i + 0.5 ? (
                  <FaStarHalfAlt key={i} />
                ) : (
                  <FaRegStar key={i} />
                );
              })}
            </div>
            <h3
              className={
                "font-semibold text-white ml-2 text-lg whitespace-nowrap "
              }
            >
              {[0, "", null, undefined].indexOf(totalReviews) !== -1
                ? "No Reviews"
                : totalReviews === 1
                ? totalReviews + " Review"
                : totalReviews > 1
                ? totalReviews + " Reviews"
                : "No Reviews"}
            </h3>
          </div>
          <button
            title="Review this product"
            onClick={reviewClick}
            className={`absolute right-7 h-9 w-9 flex items-center justify-center
              rounded-full bg-gray-600 hover:bg-gray-500 border border-yellow-400`}
          >
            <FaEdit className="" color="#ec3" />
          </button>
        </div>

        <div
          className={`h-1 w-full bg-gradient-to-b from-transparent
          via-gray-500 to-transparent`}
        />

        <div className="bg-gray-600 rounded-bl w-full h-full overflow-y-scroll">
          {reviews.length > 0 ? (
            reviews.map((review, index) => {
              return (
                <div key={index} className="grid grid-cols-4 relative m-3">
                  <div
                    style={{ minHeight: 40 + "px" }}
                    className={`self-start flex items-center justify-center
                      bg-commenter rounded-xl mr-2 py-1 px-2 tooltip`}
                  >
                    <p className="font-jose text-center break-anywhere">
                      {capitalize(review.name)}
                    </p>
                  </div>
                  <div
                    className={`col-span-3 flex flex-col bg-white p-2
                    rounded-lg w-full`}
                  >
                    <div className="flex flex-row mb-1 text-yellow-400">
                      {stars.map((star, i) => {
                        return review.rating >= i + 1 ? (
                          <FaStar key={i} />
                        ) : review.rating >= i + 0.5 ? (
                          <FaStarHalfAlt key={i} />
                        ) : (
                          <FaRegStar key={i} />
                        );
                      })}
                    </div>
                    <div>{review.comment}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className={`flex items-center justify-center h-full text-white mx-6`}
            >
              Be the first to leave a review!
            </div>
          )}
        </div>
      </div>

      <ReviewModal opened={addModal} setOpened={setAddModal} />
    </div>
  );
};

export default Reviews;
