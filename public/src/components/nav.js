import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Nav = () => {

  const linkCs = "sm:ml-5 text-white font-semibold transform "+
                 "duration-150 hover:scale-105 ";

  return (
    <nav className={"sticky top-0 z-50 mx-4 sm:mx-12 bg-gradient-to-b from-gray-900 " +
                    "to-gray-800 shadow-md h-16 rounded-b-lg flex items-center"}>
      <Link to="/" className="flex flex-row items-center group relative">
        <img src="//live.staticflickr.com/65535/51358278133_0326d83fa7_s.jpg"
             className={"w-11 h-10 ml-3 rounded-md opacity-100 " +
                        "group-hover:opacity-0 transition duration-300"} />
        <p className={"absolute border-2 border-yellow-400 rounded-md px-2 ml-2 " +
                      "font-bold bg-clip-text text-transparent bg-gradient-to-tl " +
                      "from-yellow-400 to-yellow-600 leading-tight opacity-0 " +
                      "group-hover:opacity-100 transition duration-300"}>
                      Virta<br/>Vend</p>
      </Link>
      <div className={"flex-grow flex flex-row justify-center items-center " +
                      "sm:m-0 mb-1"}>
        <div className="flex sm:flex-row flex-col mr-2 sm:mr-0">
          <Link to="/merch" className={linkCs}>Products</Link>
          <a href="#" className={linkCs}>Shipping</a>
        </div>
        <div className="flex sm:flex-row flex-col ml-2 sm:ml-0">
          <a href="#" className={linkCs}>Contact</a>
          <a href="#" className={linkCs}>Sign In</a>
        </div>
      </div>
      <Link to='/cart'
         className="self-center transform duration-150 hover:scale-110"
         title="Your Shopping Cart">
         <FaShoppingCart className="mx-4 text-2xl text-blue-100" /></Link>
    </nav>
  );
};

export default Nav;
