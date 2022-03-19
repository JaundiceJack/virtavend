const Title = ({text}) => {

  return (
    <div className={
      "flex items-center justify-center px-4 bg-gray-900 rounded-bl-xl sm:group-hover:rounded-br-xl " +
      "transform duration-500 truncate h-full w-full sm:w-1/3 sm:group-hover:w-full"

      }>
      <h3 className="capitalize truncate font-bold text-blue-100 whitespace-nowrap ">{text}</h3>
    </div>
  )
}

export default Title;
