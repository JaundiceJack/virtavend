import { FaCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={"mx-4 sm:mx-12 bg-gradient-to-t from-gray-900 to-gray-800 " +
                       "shadow-md h-8 rounded-t-lg flex justify-center " +
                       "items-center h-12"}>
      <FaCopyright className="fa fa-copyright text-white text-sm" />
      <p className="ml-1 font-semibold text-white text-sm">
        James McNeilan</p>
    </footer>
  );
};

export default Footer;
