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
import TextEntry from "../../inputs/textEntry.js";
import SelectEntry from "../../inputs/selectEntry.js";
import Button from "../../inputs/button.js";
import Steps from "../steps.js";
import Header from "../../multipurpose/header.js";
import Message from "../../multipurpose/message.js";

const Shipping = ({ history }) => {
  // Get states
  const { items, shippingAddress, shippingError, savedPaymentMethod } =
    useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);

  // Set form variables on page load
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("USA");
  const [state, setState] = useState("AL");
  useState(() => {
    setAddress(shippingAddress.address || "");
    setCity(shippingAddress.city || "");
    setZip(shippingAddress.zip || "");
    setCountry(shippingAddress.country || "USA");
    setState(shippingAddress.state || "AL");
  }, []);

  // TODO: validate their token as well
  // Kick the user to login if not logged in or to merch if the cart is empty
  useEffect(() => {
    if (!userInfo) history.push("/login?redirect=shipping");
    if (items.length === 0) history.push("/merch");
  }, [userInfo, history]);

  // Validate entries
  const dispatch = useDispatch();
  const validated = () => {
    let entry = { valid: true, error: "" };
    if (address === "") {
      entry.valid = false;
      entry.error = "Missing address.";
    }
    if (city === "") {
      entry.valid = false;
      entry.error = "Missing city.";
    }
    if (zip === "") {
      entry.valid = false;
      entry.error = "Missing zip code.";
    }
    return entry;
  };

  // Set an error to display if the address entered was invalid
  const invalidated = (error) => {
    dispatch(setShippingError(error));
  };

  // Handle address changes and submission
  const onAddressSubmit = (forwardLink) => {
    const validation = validated();
    if (validation.valid) {
      // Remove any prevous validation errors
      dispatch(resetShippingError());
      // Save the shipping info and send the user the next step
      const shipping = { address, city, zip, country, state };
      dispatch(saveShipping(shipping));
      history.push(forwardLink);
    } else invalidated(validation.error);
  };

  return (
    <div className="flex flex-col items-center w-full h-full px-4 mb-6">
      <Steps
        step1={true}
        step2={"shipping"}
        step3={address !== "" && city !== "" && zip !== ""}
        step4={
          address !== "" &&
          city !== "" &&
          zip !== "" &&
          savedPaymentMethod !== ""
        }
        shippingValidator={onAddressSubmit}
      />
      <div className="flex flex-col mt-7">
        <Header text="Shipping" />
        <div className="bg-gray-700 flex flex-col py-4 px-8">
          <div className="flex flex-col">
            <TextEntry
              name="address"
              value={address}
              label="Address:"
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextEntry
              name="city"
              value={city}
              label="City:"
              onChange={(e) => setCity(e.target.value)}
            />
            <TextEntry
              name="zip"
              value={zip}
              label="ZIP Code:"
              onChange={(e) => setZip(e.target.value)}
            />
            <SelectEntry
              name="country"
              value={country}
              label="Country:"
              options={[
                { label: "USA", value: "USA" },
                { label: "Canada", value: "Canada" },
                { label: "Mexico", value: "Mexico" },
              ]}
              onChange={(e) => setCountry(e)}
            />
            {country === "USA" && (
              <SelectEntry
                name="state"
                value={state}
                label="State:"
                options={[
                  { label: "AL", value: "AL" },
                  { label: "AK", value: "AK" },
                  { label: "AZ", value: "AZ" },
                  { label: "AR", value: "AR" },
                  { label: "CA", value: "CA" },
                  { label: "CO", value: "CO" },
                  { label: "CT", value: "CT" },
                  { label: "DE", value: "DE" },
                  { label: "FL", value: "FL" },
                  { label: "GA", value: "GA" },
                  { label: "HI", value: "HI" },
                  { label: "ID", value: "ID" },
                  { label: "IL", value: "IL" },
                  { label: "IN", value: "IN" },
                  { label: "IA", value: "IA" },
                  { label: "KS", value: "KS" },
                  { label: "KY", value: "KY" },
                  { label: "LA", value: "LA" },
                  { label: "ME", value: "ME" },
                  { label: "MD", value: "MD" },
                  { label: "MA", value: "MA" },
                  { label: "MI", value: "MI" },
                  { label: "MN", value: "MN" },
                  { label: "MS", value: "MS" },
                  { label: "MO", value: "MO" },
                  { label: "MT", value: "MT" },
                  { label: "NE", value: "NE" },
                  { label: "NV", value: "NV" },
                  { label: "NH", value: "NH" },
                  { label: "NJ", value: "NJ" },
                  { label: "NM", value: "NM" },
                  { label: "NY", value: "NY" },
                  { label: "NC", value: "NC" },
                  { label: "ND", value: "ND" },
                  { label: "OH", value: "OH" },
                  { label: "OK", value: "OK" },
                  { label: "OR", value: "OR" },
                  { label: "PA", value: "PA" },
                  { label: "RI", value: "RI" },
                  { label: "SC", value: "SC" },
                  { label: "SD", value: "SD" },
                  { label: "TN", value: "TN" },
                  { label: "TX", value: "TX" },
                  { label: "UT", value: "UT" },
                  { label: "VT", value: "VT" },
                  { label: "VA", value: "VA" },
                  { label: "WA", value: "WA" },
                  { label: "WV", value: "WV" },
                  { label: "WI", value: "WI" },
                  { label: "WY", value: "WY" },
                ]}
                onChange={(e) => setState(e)}
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
          onClick={() => onAddressSubmit("/method")}
        />
      </div>
    </div>
  );
};

export default Shipping;
