const Price = ({value}) => {

  return (
    <div className={
      "flex items-center justify-center bg-gray-900 rounded-br-xl sm:px-0 px-2 " +
      "transform duration-500 sm:w-28 sm:group-hover:w-0 sm:group-hover:opacity-0 "
    }>
      <h3 className="italic font-bold text-blue-100 text-center">${value}</h3>
    </div>
  )
}

export default Price;
