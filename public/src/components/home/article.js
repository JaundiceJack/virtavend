import { useState, useEffect } from 'react';
import { getLinkDetails } from '../../actions/homeActions.js';
import { handleError } from '../../actions/errorActions.js';
import { IoMdQuote } from 'react-icons/io';
import Spinner from '../multipurpose/spinner.js';
import Message from '../multipurpose/message.js';

const Article = ({ link, extraClasses }) => {
  const [article, setArticle] = useState({
    loading: true,
    error: null,
    title: null,
    img: null,
    description: null,
  });

  useEffect(() => {
    if (article.loading) {
      const getDetails = async () => {
        try {
          const details = await getLinkDetails(link);
          setArticle({ ...article,
            loading: false,
            title: details.title,
            img: details.img,
            description: details.description,
          });
        } catch(e) { setArticle({ ...article, loading: false, error: handleError(e) }) }
      }
      getDetails();
    }
  }, [article])

  return (
    <a href={link}
       title={article.title}
       target="_blank"
       className={"mx-auto my-3 bg-gradient-to-br flex " +
       "from-gray-700 to-gray-800 rounded-xl hover:shadow-lg " +
       "hover:from-gray-600 hover:to-gray-700 " +
       "border-l-2 border-b-2 border-yellow-400 "}
      >
      {article.loading ?
        <Spinner extraClasses="w-full mx-auto my-6" /> :
        article.error ?
        <Message error={article.error} /> :
        <div className="grid grid-cols-5 gap-x-2 ">
          <img src={article.img}
            alt="Article Image"
            className="ml-4  my-2 h-16 w-16 rounded-lg self-center" />
          <div className="col-span-4 m-4" >
            <p className="text-white mb-2 truncate">{article.title}</p>
            <div className="flex flex-row">
              <p className="text-white text-sm"><IoMdQuote className="transform rotate-180" /></p>
              <p className="text-white truncate">{article.description}</p>
              <p className="text-white text-sm"><IoMdQuote className="" /></p>
            </div>
          </div>
        </div>
      }

    </a>
  )
}

export default Article;
