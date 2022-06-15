const Image = ({ image, name }) => {
  return (
    <div
      className={`p-4 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-700 
                  rounded-t-xl sm:rounded-tr-none sm:rounded-l-lg sm:row-span-2 
                  sm:border-r sm:border-gray-600`}
    >
      <div className="bg-white rounded-lg p-2">
        <img src={image} alt={name} className="" />
      </div>
    </div>
  );
};

export default Image;
