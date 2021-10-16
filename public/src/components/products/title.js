const Title = ({text}) => {

  return (
    <div className={"w-44 sm:w-28 max-w-sm px-4 bg-gray-900 duration-500 transform " +
                    "sm:hover:w-44 rounded-bl-xl  " +
                    "flex items-center justify-center "}>
      <h3 className="italic truncate font-bold text-blue-100 whitespace-nowrap ">{text}</h3>
    </div>
  )
}

export default Title;
