const Stock = ({ amount }) => {
  return (
    <div className={"grid grid-cols-2 gap-2 bg-gray-700 p-4 pointer-events-none " +
      (amount === 0 ? "rounded-b-lg" : "")}>
      <p className="text-right font-semibold text-white">Status:</p>
      <p className="font-semibold text-white">
        {amount === 0 ? 'Out of Stock' : 'In Stock'}</p>
    </div>
  )
}

export default Stock;
