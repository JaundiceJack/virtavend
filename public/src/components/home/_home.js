import Slider from './slider.js';
import Featured from './featured.js';
import Deal from './deal.js';
import News from './news.js';

const Home = () => {
  return (
    <div className="mt-6">
      <Slider />
      <div className="mx-12 mb-4 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Featured />
        <News />
        <Deal />
      </div>
    </div>
  );
};

export default Home;
