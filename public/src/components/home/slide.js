const Slide = ({ title, item1, item2, item3, image, effect="" }) => {
  const slideStringClasses =
    "sm:text-blue-200 text-transparent bg-clip-text sm:bg-transparent " +
    "bg-gradient-to-b from-blue-300 to-yellow-300 font-semibold " +
    "self-center sm:self-end mb-7 transform duration-150 " +
    "hover:scale-110 cursor-pointer shadow-2xl"

  return (
    <div className={"relative h-full grid rounded-lg  overflow-hidden " + effect}>

      {/* Links */}
      <div className={"absolute inset-x-0 flex flex-col sm:w-1/4 sm:bg-gray-900 z-20 rounded-l-lg"}>
        {title &&
          <h1 className={
            "sm:text-white text-transparent bg-clip-text sm:bg-transparent " +
            "bg-gradient-to-b from-blue-300 to-yellow-300 " +
            "font-bold text-xl text-center sm:text-right mt-6 mb-4 "}>
            {title}
          </h1>
        }
        {typeof item1 === 'string' ?
          <div className={slideStringClasses + " sm:-mr-12 "}>
            {item1}
          </div> :
          item1
        }
        {typeof item2 === 'string' ?
          <div className={slideStringClasses + " sm:-mr-6 "}>
            {item2}
          </div> :
          item2
        }
        {typeof item3 === 'string' ?
          <div className={slideStringClasses}>
            {item3}
          </div> :
          item3
        }
      </div>

      {/* Divider shape */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="inherit"
        className={"absolute left-1/4 hidden sm:block right-0 w-64 z-10 "} >
        {/* Set the coloring */}
        <defs>
          <linearGradient id="grad" gradientTransform="rotate(0)">
            <stop offset="0%"   stopColor="#111827" />
            <stop offset="100%" stopColor="#222938" />
          </linearGradient>
        </defs>
        {/* Define the shape */}
        <polygon fill="url(#grad)" points="0,0 50,0 0,100" />
        <polygon fill="#345" points="58,0 74,0 24,100 8,100" />
        <polygon fill="#567" points="85,0 90,0 40,100 35,100" />
      </svg>

      {/* Image */}
      <div className={"absolute sm:right-0 inset-y-0 w-full sm:w-3/4" }>
        <img src={image} alt="showcase" className={
          "h-full w-full object-cover image-center rounded-r-lg rounded-l-lg sm:rounded-l-none "
        } />
      </div>
    </div>
  )
}

export default Slide;
