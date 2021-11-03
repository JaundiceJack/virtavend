const Title = ({ title }) => {
  return (
    <h3 className={"font-bold text-white text-3xl capitalize " +
      "bg-gray-700 py-4 px-6 rounded-tr-xl"}>{title}
    </h3>
  )
}

export default Title;
