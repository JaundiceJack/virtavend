// Import icons
import { FaLongArrowAltRight } from "react-icons/fa";
// Import components
import Step from "./step.js";

const Steps = ({ step1, step2, step3, step4, shippingValidator = null }) => {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center bg-gray-700 mx-auto rounded-lg my-8 py-4 px-8`}
    >
      <Step step={step1} text="Cart" link="/cart" />
      <FaLongArrowAltRight
        className={`mx-2 mt-1 text-xl text-white transform rotate-90 sm:rotate-0`}
      />
      <Step step={step2} text="Shipping" link="/shipping" />
      <FaLongArrowAltRight
        className={`mx-2 mt-1 text-xl text-white transform rotate-90 sm:rotate-0`}
      />
      {/* Only supply the shipping validator for steps after shipping */}
      <Step
        step={step3}
        text="Method"
        link="/method"
        shippingValidator={shippingValidator}
      />
      <FaLongArrowAltRight
        className={`mx-2 mt-1 text-xl text-white transform rotate-90 sm:rotate-0`}
      />
      <Step
        step={step4}
        text="Review"
        link="/summary"
        shippingValidator={shippingValidator}
      />
    </div>
  );
};

export default Steps;
