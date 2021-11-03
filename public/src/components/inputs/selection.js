const Selection = ({name, value, label, options, required=false, onChange, extraClasses}) => {
  return (
    <div className={"grid grid-cols-4 items-center "+extraClasses}>
      <label className="text-white text-right font-semibold">{label}:</label>
      <select name={name} value={value} required={required}
        onChange={onChange} className="rounded p-1 ml-2 col-span-3 w-full self-end">
        {options.map((option, index) => {
          return <option key={index} value={option} className="capitalize">{option}</option>
        })}
      </select>
    </div>
  )
}

export default Selection;
