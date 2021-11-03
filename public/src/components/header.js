const Header = ({ text }) => {
  return (
    <div className="flex flex-col w-full">
      <div className={"bg-header rounded-t-xl py-4 h-14"}>
        <h2 className=" text-white font-semibold text-lg text-center ">
          {text}
        </h2>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700" />
    </div>
  )
}

export default Header;
