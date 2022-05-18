import { FaStarHalfAlt, FaStar, FaRegStar } from 'react-icons/fa'

const Reviews = ({ reviews, totalReviews, averageReview }) => {
  const stars = [1,2,3,4,5];

  return (
    <div className={`bg-gray-700 p-3 sm:rounded-bl-none
      rounded-bl-lg rounded-br-lg flex-grow`}>
      <div className={`bg-white border-2 border-gray-500 p-6 h-full rounded-lg`}>
        <div>
          <div className="flex flex-row font-semibold text-yellow-400 justify-center mr-2">
            {stars.map( (star, i) => {
              return averageReview >= i+1 ?
                <FaStar key={i} /> : averageReview >= i+0.5 ?
                <FaStarHalfAlt key={i} /> :
                <FaRegStar key={i} />
            })}
          </div>
          <h3 className={"font-semibold text-lg whitespace-nowrap "}>
            {
              [0, "", null, undefined].indexOf(totalReviews) !== -1 ? 'No Reviews' :
              totalReviews === 1 ?
              totalReviews + ' Review' :
              totalReviews > 1 ? totalReviews + ' Reviews' : "No Reviews"
            }
          </h3>
        </div>

        {
          reviews.map((review, index) => {
            return (
              <div key={index} className="">
                From: {review.name}
                Rating: {review.rating}
                Comments: {review.comment}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Reviews;
