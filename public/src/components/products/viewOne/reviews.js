import { capitalize } from '../../../functions/strings.js';
import { FaStarHalfAlt, FaStar, FaRegStar, FaPlus, FaRegTrashAlt, FaEdit } from 'react-icons/fa'

const Reviews = ({ reviews, totalReviews, averageReview }) => {
  const stars = [1,2,3,4,5];

  // const { userInfo } = useSelector(state => state.userLogin);


  const tempReviews = [
    {name: 'i c weiner', rating: 4, comment: 'kinda good'}
  ]

  return (
    <div className={`bg-gray-700 p-3 sm:rounded-bl-none
      rounded-bl-lg rounded-br-lg flex-grow`}>
      <div className={`border-2 border-gray-500 h-full rounded-lg flex flex-col`}>
        <div className={`flex flex-row items-center justify-center bg-gray-700
          rounded-t p-4 relative h-32 sm:h-28`}>
          <div className="absolute sm:left-4 left-0 right-0 flex sm:flex-row flex-col items-center w-full">
            <div className={`flex flex-row font-semibold text-yellow-400
              justify-center bg-gray-600 m-2 p-4 rounded-lg`}>
              {stars.map( (star, i) => {
                return averageReview >= i+1 ?
                  <FaStar key={i} /> : averageReview >= i+0.5 ?
                  <FaStarHalfAlt key={i} /> :
                  <FaRegStar key={i} />
              })}
            </div>
            <h3 className={"font-semibold text-white ml-2 text-lg whitespace-nowrap "}>
              {
                [0, "", null, undefined].indexOf(totalReviews) !== -1 ? 'No Reviews' :
                totalReviews === 1 ?
                totalReviews + ' Review' :
                totalReviews > 1 ? totalReviews + ' Reviews' : "No Reviews"
              }
            </h3>
          </div>



          <button
            title="Review this product"
            className={`absolute right-7 h-9 w-9 flex items-center justify-center
              rounded-full bg-gray-600 hover:bg-gray-500 border border-yellow-400`}>
            <FaEdit className="" color="#ec3" />
          </button>
        </div>

        <div className="h-2 w-full bg-gradient-to-b from-transparent via-gray-500 to-transparent" />

        <div className="bg-gray-600 rounded-b w-full h-82 overflow-y-scroll">
          {
            tempReviews.length > 0 ?
            tempReviews.map((review, index) => {
              return (
                <div key={index} className="flex flex-row m-4">
                  <div className="flex items-center justify-center bg-commenter px-2 rounded-full mr-2 border border-gray-400">
                    <p className="font-jose text-center">{capitalize(review.name)}</p>
                  </div>
                  <div className="flex flex-col bg-white p-2 rounded-lg w-full">
                    <div className="flex flex-row mb-1 text-yellow-400">
                      {stars.map( (star, i) => {
                        return review.rating >= i+1 ?
                          <FaStar key={i} /> : review.rating >= i+0.5 ?
                          <FaStarHalfAlt key={i} /> :
                          <FaRegStar key={i} />
                      })}
                    </div>
                    <div>{review.comment}</div>
                  </div>

                </div>
              )
            }) :
            <div className="flex items-center justify-center h-full text-white mx-6">Be the first to leave a review!</div>
          }
        </div>
      </div>
    </div>
  )
}

export default Reviews;
