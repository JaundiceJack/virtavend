const Price = ({ price }) => {
  return (
    <div
      className={`grid grid-cols-2 gap-2 bg-header rounded-t-xl p-4 pointer-events-none`}
    >
      <p className="text-right font-semibold text-white">Price:</p>
      <p className="font-semibold text-white">${price && price.toFixed(2)}</p>
    </div>
  );
};

export default Price;
