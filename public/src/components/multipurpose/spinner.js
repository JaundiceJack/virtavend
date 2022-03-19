import { ImSpinner9 } from 'react-icons/im';

const Spinner = ({ extraClasses="" }) => {
  return (
    <ImSpinner9 className={"spin text-4xl col-span-full self-center "+extraClasses} />
  );
};
export default Spinner;
