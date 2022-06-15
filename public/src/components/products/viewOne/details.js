const Details = ({ details }) => {
  return (
    <div
      className={`bg-gray-700 p-3 sm:rounded-bl-none rounded-bl-lg rounded-br-lg flex-grow`}
    >
      <h3
        className={`bg-white border-2 border-gray-500 py-4 px-6 h-full 
                    break-anywhere text-lg text-black font-semibold rounded-lg `}
      >
        {details}
      </h3>
    </div>
  );
};

export default Details;
