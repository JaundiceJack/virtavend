// Import basics
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import dispatch actions
import { validateToken } from "../../actions/userActions.js";

const TokenValidation = ({ history, redirect }) => {
  // Get states
  const { userInfo } = useSelector((state) => state.userLogin);

  // Check for user and validate token on page load
  const dispatch = useDispatch();
  useEffect(() => {
    const relog = async () => {
      if (!userInfo) history.push(redirect);
      else {
        const validToken = await dispatch(validateToken(userInfo.token));
        if (!validToken) {
          history.push(redirect);
        }
      }
    };
    relog();
  }, [dispatch, userInfo]);

  return <div></div>;
};

export default TokenValidation;
