// Import basics
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import dispatch actions
import {
  saveShipping,
  setShippingError,
  resetShippingError,
} from "../../../actions/cartActions.js";
// Import components
import Entry from "../../inputs/entry.js";
import Button from "../../inputs/button.js";
import Selection from "../../inputs/selection.js";
import Steps from "../steps.js";
import Header from "../../multipurpose/header.js";
import Message from "../../multipurpose/message.js";

const Shipping = ({ history }) => {
  // Get the shipping address if it was saved earlier
  const { items, shippingAddress, shippingError, savedPaymentMethod } =
    useSelector((state) => state.cart);

  // Set form variables
  const [shipping, setShipping] = useState({
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    zip: shippingAddress.zip || "",
    country: shippingAddress.country || "USA",
    state: shippingAddress.state || "AL",
  });

  // Grab user info from the state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Kick the user to login if not logged in or to merch if the cart is empty
  useEffect(() => {
    if (!userInfo) history.push("/login?redirect=shipping");
    if (items.length === 0) history.push("/merch");
  }, [userInfo, history]);

  // Validate entries
  const dispatch = useDispatch();
  const validated = () => {
    let entry = { valid: true, error: "" };
    if (shipping.address === "") {
      entry.valid = false;
      entry.error = "Missing address.";
    }
    if (shipping.city === "") {
      entry.valid = false;
      entry.error = "Missing city.";
    }
    if (shipping.zip === "") {
      entry.valid = false;
      entry.error = "Missing zip code.";
    }
    return entry;
  };
  const invalidated = (error) => {
    dispatch(setShippingError(error));
  };

  // Handle address changes and submission
  const onAddressSubmit = (forwardLink) => {
    const validation = validated();
    if (validation.valid) {
      dispatch(resetShippingError());
      dispatch(saveShipping(shipping));
      history.push(forwardLink);
    } else invalidated(validation.error);
  };
  const editShipping = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
    dispatch(saveShipping({ ...shipping, [e.target.name]: e.target.value }));
  };
  console.log(shippingAddress);
  return (
    <div className="flex flex-col items-center w-full h-full px-4 mb-6">
      <Steps
        step1={true}
        step2={"shipping"}
        step3={
          shipping.address !== "" && shipping.city !== "" && shipping.zip !== ""
        }
        step4={
          shipping.address !== "" &&
          shipping.city !== "" &&
          shipping.zip !== "" &&
          savedPaymentMethod !== ""
        }
        shippingValidator={onAddressSubmit}
      />
      <div className="flex flex-col mt-7">
        <Header text="Shipping" />
        <div className="bg-gray-700 flex flex-col py-4 px-8">
          <div className="flex flex-col">
            <Entry
              type="text"
              name="address"
              value={shipping.address}
              label="Address"
              required={true}
              onChange={editShipping}
              extraClasses="mb-3"
            />
            <Entry
              type="text"
              name="city"
              value={shipping.city}
              label="City"
              required={true}
              onChange={editShipping}
              extraClasses="mb-3"
            />
            <Entry
              type="text"
              name="zip"
              value={shipping.zip}
              label="ZIP Code"
              required={true}
              onChange={editShipping}
              extraClasses="mb-3"
            />
            <Selection
              name="country"
              value={shipping.country}
              label="Country"
              required={true}
              options={["USA", "Canada", "Mexico"]}
              onChange={editShipping}
              extraClasses=""
            />
            {shipping.country === "USA" && (
              <Selection
                name="state"
                value={shipping.state}
                label="State"
                options={[
                  "AL",
                  "AK",
                  "AZ",
                  "AR",
                  "CA",
                  "CO",
                  "CT",
                  "DE",
                  "FL",
                  "GA",
                  "HI",
                  "ID",
                  "IL",
                  "IN",
                  "IA",
                  "KS",
                  "KY",
                  "LA",
                  "ME",
                  "MD",
                  "MA",
                  "MI",
                  "MN",
                  "MS",
                  "MO",
                  "MT",
                  "NE",
                  "NV",
                  "NH",
                  "NJ",
                  "NM",
                  "NY",
                  "NC",
                  "ND",
                  "OH",
                  "OK",
                  "OR",
                  "PA",
                  "RI",
                  "SC",
                  "SD",
                  "TN",
                  "TX",
                  "UT",
                  "VT",
                  "VA",
                  "WA",
                  "WV",
                  "WI",
                  "WY",
                ]}
                onChange={editShipping}
                extraClasses="mt-3"
              />
            )}
          </div>

          {shippingError && (
            <Message error={shippingError} extraClasses="mt-4" />
          )}
        </div>
        <Button
          text="Go to Payment Method"
          onClick={() => onAddressSubmit("/payment")}
        />
      </div>
    </div>
  );
};

export default Shipping;
