const InfoPanel = ({ title, contents, titleClasses, contentClasses, extraClasses }) => {
  return (
    <div className={"flex flex-col " + extraClasses}>
      <div className={"bg-gray-700 flex flex-col py-4 px-8 border-r border-gray-500 relative " + titleClasses}>
        <div className="absolute top-0 left-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-600 h-full w-7"
          style={{clipPath: 'polygon(0% 60%, 0% 40%, 40% 35%, 100% 48%, 100% 52%, 40% 65%)'}}/>
        <h3 className="text-white ml-4 font-semibold">
          {title}
        </h3>
      </div>
      <div className={"bg-gray-600 flex flex-col py-4 px-8 border-r border-b border-gray-500 " + contentClasses}>
        {contents}
      </div>
    </div>
  )
}

export default InfoPanel;
