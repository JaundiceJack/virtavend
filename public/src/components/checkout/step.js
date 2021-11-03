import { Link } from 'react-router-dom';

const Step = ({ step, text, link }) => {
  return ( step ?
    <Link to={link}
      className={"font-semibold " +
        (step === 'current' ?
          'text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-200 text-xl' :
          'text-transparent bg-clip-text bg-gradient-to-b from-green-200 via-green-300 to-green-200' )
        }>
      {text}
    </Link> :
    <button disabled={true}
      className="text-gray-300 font-semibold">
      {text}
    </button>
  )
}

export default Step;
