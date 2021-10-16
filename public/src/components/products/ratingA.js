import { FaStarHalfAlt, FaStar, FaRegStar } from 'react-icons/fa'

const RatingA = ({value, numReviews}) => {
  const stars = [1,2,3,4,5];

  return (
    <div className="w-28 p-2 bg-gray-700 text-center">

      <div className="flex flex-row font-semibold text-yellow-300 justify-center">
        {stars.map( (star, i) => {
          return value >= i+1 ?
            <FaStar key={i} /> : value >= i+0.5 ?
            <FaStarHalfAlt key={i} /> :
            <FaRegStar key={i} />
        })}
      </div>

      <h3 className="font-semibold text-blue-100 whitespace-nowrap">
        {
          [0, "", null, undefined].indexOf(numReviews) !== -1 ? 'No Reviews' :
          numReviews === 1 ?
          numReviews + ' Review' :
          numReviews > 1 ? numReviews + ' Reviews' : "No Reviews"
        }
      </h3>

    </div>
  )
}

export default RatingA;
