const Button = ({
  text,
  type="button",
  color="yellow",
  position="b",
  smallPosition="b",
  gradientDirection="br",
  onClick,
  disabled=false,
  extraClasses=""
}) => {
  const roundedSelection =
    position === 'b' ? "sm:rounded-b-xl sm:rounded-t-none " :
    position === 't' ? "sm:rounded-t-xl sm:rounded-b-none " :
    position === 'r' ? "sm:rounded-r-xl sm:rounded-l-none " :
    position === 'l' ? "sm:rounded-l-xl sm:rounded-r-none " :
    position === 'br' ? "sm:rounded-br-xl sm:rounded-bl-none sm:rounded-t-none " :
    position === 'bl' ? "sm:rounded-bl-xl sm:rounded-br-none sm:rounded-t-none " :
    position === 'tr' ? "sm:rounded-tr-xl sm:rounded-tl-none sm:rounded-b-none " :
    position === 'tl' && "sm:rounded-tl-xl sm:rounded-tr-none sm:rounded-b-none ";
  const borderSelection =
    position === 'b'  ? 'border-t ' :
    position === 't'  ? 'border-b ' :
    position === 'r'  ? 'border-l ' :
    position === 'l'  ? 'border-r ' :
    position === 'br' ? 'border-t border-l ' :
    position === 'bl' ? 'border-t border-r ' :
    position === 'tr' ? 'border-b border-l ' :
    position === 'tl' && 'border-b border-r '

  return (
    <button disabled={disabled}
      type={type}
      onClick={onClick}
      className={
        `bg-${color}-400 ` +
        roundedSelection +
        (smallPosition && `rounded-${smallPosition}-xl `) +
        extraClasses
      }>
      <div className={
        "w-full h-full p-4 flex items-center justify-center text-center " +
        "transform duration-300 group relative " +
        "move-button shadow-b " +
        "border-gray-600 border-opacity-50 hover:border-opacity-30 " +
        "from-gray-800 via-gray-800 to-gray-600 " +
        "hover:from-gray-800 hover:via-gray-700 hover:to-gray-600 " +
        `bg-gradient-to-${gradientDirection} ` +
        borderSelection +
        roundedSelection +
        (smallPosition && `rounded-${smallPosition}-xl `)
      }>
        <p className={
          "text-xl text-transparent font-bold bg-clip-text " +
          `bg-gradient-to-${gradientDirection} ` +
          `from-${color}-400 via-${color}-400 to-${color}-100 ` +
          "whitespace-nowrap "
        }>
          {text}
        </p>
      </div>
    </button>
  )
}

export default Button;
