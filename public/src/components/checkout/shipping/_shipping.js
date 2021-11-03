import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../../../actions/cartActions.js';
import Entry from '../../inputs/entry.js';
import Button from '../../inputs/button.js';
import Selection from '../../inputs/selection.js';
import Steps from '../steps.js';
import Header from '../../header.js';

const Shipping = ({ history }) => {
  // Get the shipping address if it was saved earlier
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  // Set form variables
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [zip, setZip] = useState(shippingAddress.zip);
  const [country, setCountry] = useState(shippingAddress.country || "USA");
  const [state, setState] = useState(shippingAddress.state);

  // Grab user info from the state
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  // Kick the user to login if not logged in
  useEffect(() => { if (!userInfo) history.push('/login?redirect=shipping') },
    [userInfo, history]);

  // Validate entries and submit address info
  const dispatch = useDispatch();
  const onAddress = (e) => {
    e.preventDefault();
    dispatch(saveShipping(address, city, zip, country, state));
    history.push("/payment");
  }

  return (
    <form onSubmit={onAddress} className="flex flex-col items-center w-full h-full px-4 mb-6" >
      <Steps step1={true} step2={'current'} />
      <div className="flex flex-col mt-7">
        <Header text="Shipping" />
        <div className="bg-gray-700 flex flex-col py-4 px-8">

          <div className="flex flex-col">
            <Entry type="text" name="address" value={address} label="Address" required={true}
              onChange={(e) => setAddress(e.target.value)} extraClasses="mb-3" />
            <Entry type="text" name="city" value={city} label="City" required={true}
              onChange={(e) => setCity(e.target.value)} extraClasses="mb-3" />
            <Entry type="text" name="zip" value={zip} label="ZIP Code" required={true}
              onChange={(e) => setZip(e.target.value)} extraClasses="mb-3" />
            <Selection name="country" value={country} label="Country" required={true}
              options={["USA", "Canada", "Mexico"]}
              onChange={(e) => setCountry(e.target.value)} extraClasses="" />
            {country === "USA" &&
              <Selection name="state" value={state} label="State"
                options={["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL",
                  "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
                  "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
                  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
                  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]}
                onChange={(e) => setState(e.target.value)} extraClasses="mt-3" />
            }
          </div>


        </div>
        <Button text="Go To Payment" type="submit" />
      </div>
    </form>
  )
}

export default Shipping;
