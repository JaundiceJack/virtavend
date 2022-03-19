import { FaStarHalfAlt, FaStar, FaRegStar } from 'react-icons/fa'

const Rating = ({value, numReviews}) => {
  const stars = [1,2,3,4,5];

  return (
    <div className={"flex flex-col items-center justify-center sm:px-0 px-2 py-2 bg-gray-600 " +
    "transform duration-500 h-full sm:w-1/3 sm:group-hover:w-0 sm:group-hover:opacity-0 "}>

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

export default Rating;
