const Price = ({value}) => {

  return (
    <div className="w-28 px-4 bg-gray-900 rounded-br-xl flex items-center justify-center ">
      <h3 className="italic font-bold text-blue-100 text-center">${value}</h3>
    </div>
  )
}

export default Price;
