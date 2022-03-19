import Slider from './slider.js';
import Featured from './featured.js';
import Deal from './deal.js';
import News from './news.js';
import { IoIosConstruct } from 'react-icons/io';

const Home = () => {
  return (
    <div className="mt-6">
      <Slider />
      <div className="flex justify-center items-center bg-yellow-500 rounded-lg p-4 w-max mx-auto">
        <IoIosConstruct size="35" />
        <p className="font-semibold ml-2">This website is under construction.<br />Everything is a placeholder.</p>
      </div>
      <div className="mx-12 mb-4 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Featured />
        <News />
        <Deal />
      </div>
    </div>
  );
};

export default Home;
