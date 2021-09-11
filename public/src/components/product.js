const Product = ({product}) => {
  return (
    <div className="bg-gray-200 rounded-lg p-4">

      <div className="h-72 w-full bg-white rounded shadow relative">
        <img src={product.image} alt="" className="mx-auto h-full rounded"/>
        <h3 className="absolute left-2 bottom-2 font-semibold text-yellow-300">
          {product.rating} {product.rating && 'stars'}</h3>
        <h3 className="italic absolute right-2 bottom-2 font-bold text-yellow-400">
          ${product.price}</h3>
      </div>
      <h2 className="text-sm text-center mt-3">{product.name}</h2>



    </div>
  )
}

export default Product;
