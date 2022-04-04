// Import icons
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={`pt-4 `}>
      <a
        href="https://www.legidev.com"
        target="_blank"
        className={`flex flex-row items-center justify-center
          font-jose font-semibold text-gray-800`}
      >
        <p className="text-center ">James McNeilan</p>
        <p className="text-right flex flex-row items-center">
          <FaRegCopyright className="text-gray-800 mx-2 " />
          2022
        </p>
      </a>
    </footer>
  );
};

export default Footer;
