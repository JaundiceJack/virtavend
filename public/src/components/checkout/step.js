// Import basics
import { useHistory } from "react-router-dom";

const Step = ({ step, text, link, shippingValidator = null }) => {
  // When a step is clicked, check shipping and go to the step
  const history = useHistory();
  const onLinkClick = () => {
    shippingValidator && step && typeof step !== "string"
      ? shippingValidator(link)
      : history.push(link);
  };

  return step ? (
    <button
      onClick={onLinkClick}
      className={
        "font-semibold " +
        (typeof step === "string"
          ? `text-transparent bg-clip-text bg-gradient-to-b
             from-yellow-200 via-yellow-300 to-yellow-200 text-xl`
          : `text-transparent bg-clip-text bg-gradient-to-b 
             from-green-200 via-green-300 to-green-200`)
      }
    >
      {text}
    </button>
  ) : (
    <button disabled={true} className="text-gray-300 font-semibold">
      {text}
    </button>
  );
};

export default Step;
