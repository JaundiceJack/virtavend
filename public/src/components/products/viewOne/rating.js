import { FaStarHalfAlt, FaStar, FaRegStar } from 'react-icons/fa'

const Rating = ({value, numReviews}) => {
  const stars = [1,2,3,4,5];

  return (
    <div className={`flex flex-row items-center py-4 px-6 bg-gray-800
      border-r border-gray-600 font-semibold border-b border-t border-gray-600`}>

      <div className="flex flex-row font-semibold text-yellow-400 justify-center mr-2">
        {stars.map( (star, i) => {
          return value >= i+1 ?
            <FaStar key={i} /> : value >= i+0.5 ?
            <FaStarHalfAlt key={i} /> :
            <FaRegStar key={i} />
        })}
      </div>

      <h3 className={"font-semibold text-lg whitespace-nowrap text-white "}>
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
