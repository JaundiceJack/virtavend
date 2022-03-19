import { useState } from 'react';
import { CgCloseR } from 'react-icons/cg';

const Message = ({info, error, warning, success, link=null, extraClasses=""}) => {
  const bgColor = info    ? "bg-blue-300" :
                  error   ? "bg-red-300" :
                  warning ? "bg-yellow-300" :
                  success ? "bg-green-300" : "bg-gray-400";
  const messageClasses = "flex items-center justify-center p-2 " +
                         "col-span-full rounded relative " + bgColor;
  return (
    <div className={(messageClasses+" "+extraClasses)}>
      <p className="text-xl font-semibold">
        {info ? info : error ? error : warning ? warning : success ? success : ""}
      </p>
      {link && link}
    </div>
  )
}

export default Message;
