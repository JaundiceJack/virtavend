import { useState } from 'react';
import { CgCloseR } from 'react-icons/cg';

const Message = ({info, error, warning, success, link=null, extraClasses=""}) => {
  const [hide, setHide] = useState(false);
  const bgColor = info    ? "bg-blue-300" :
                  error   ? "bg-red-300" :
                  warning ? "bg-yellow-300" :
                  success ? "bg-green-300" : "bg-gray-400";
  const messageClasses = "flex items-center justify-center p-2 " +
                         "col-span-full rounded-xl relative " + bgColor;
  return (
    <div className={hide ? "hidden" : (messageClasses+" "+extraClasses)}>
      <button className="absolute top-2 right-4 w-4 h-4 transform hover:scale-105"
              onClick={ () => setHide(true) }>
        <CgCloseR className="text-2xl" />
      </button>
      <p className="text-xl font-semibold">
        {info ? info : error ? error : warning ? warning : success ? success : ""}
      </p>
      {link && link}
    </div>
  )
}

export default Message;
