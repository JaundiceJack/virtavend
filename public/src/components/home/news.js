import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLinks } from '../../actions/homeActions.js';
import Message from '../multipurpose/message.js';
import Spinner from '../multipurpose/spinner.js';
import Article from './article.js';

const News = ({ title, extraClasses }) => {
  const { articles, loading, error } = useSelector(state => state.articleDetails);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!articles) dispatch(getLinks());
  }, [dispatch, articles])

  return (
    <div className="flex flex-col w-full rounded-t-lg rounded-b-xl overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="bg-header text-white font-semibold text-center p-4">
          Weekly Web
        </div>
        <div className="bg-white p-4 rounded-b-xl h-full flex flex-col">
          {
            loading ? <Spinner extraClasses="h-full self-center justify-self-center" /> :
            error ? <Message error={error} extraClasses="my-auto " /> :
            <div>
              {articles && articles.map((article, index) => {
                return <Article key={index} link={article.link} />
              })}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default News;
