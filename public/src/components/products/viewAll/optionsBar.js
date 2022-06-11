// Import basics
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// Import dispatch actions
import { getProducts } from "../../../actions/productActions.js";
// Import components
import { FaSearch, FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TextInput } from "@mantine/core";

const OptionsBar = () => {
  // Set a search term and toggle-able item categories
  const [keyword, setKeyword] = useState("");
  const categories = ["shirt", "device", "trinket"];
  const [checked, setChecked] = useState(() => {
    let initial = {};
    categories.forEach((category) => (initial[category] = true));
    return initial;
  });

  // Send the search query on click/submission
  const history = useHistory();
  const dispatch = useDispatch();
  const onSearch = (e) => {
    e.preventDefault();
    dispatch(getProducts(keyword.trim()));
    if (keyword.trim()) {
      history.push(`/merch/search/${keyword.trim()}`);
    } else {
      history.push(`/merch`);
    }
  };

  return (
    <form
      onSubmit={onSearch}
      className={`mx-auto relative mt-6 mb-12 flex flex-row lg:flex-nowrap
        flex-wrap items-center justify-center lg:h-20 w-162`}
    >
      <TextInput
        placeholder="Search"
        name="keyword"
        value={keyword}
        radius="md"
        size="xs"
        className="lg:ml-29 w-44"
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button
        type="submit"
        style={{ background: "radial-gradient(at center, #789, #345)" }}
        className={`z-10 p-4 text-yellow-500 rounded-full transform duration-150
          hover:scale-105 lg:absolute border-2 border-yellow-600`}
      >
        <FaSearch size="25" />
      </button>

      <div
        className={`flex flex-row flex-wrap items-center justify-center
        lg:mt-0 mt-4 lg:w-auto w-full`}
      >
        {/* trapezoid to connect the search button and category options */}
        <div className="hidden lg:flex h-12 w-14 flex-col">
          <svg
            className={"h-4"}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="inherit"
          >
            <polygon fill="rgb(55 65 81)" points="100,0 0,100 100,100" />
          </svg>
          <div className="flex-grow bg-gray-700" />
          <svg
            className={"h-4"}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="inherit"
          >
            <polygon fill="rgb(55 65 81)" points="100,0 0,0 100,100" />
          </svg>
        </div>

        <div
          className={` h-12 flex flex-row p-2 rounded-lg lg:rounded-l-none
          bg-gray-700`}
        >
          {categories.map((cat, index) => {
            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  let flip = { ...checked };
                  flip[cat] = !flip[cat];
                  setChecked(flip);
                }}
                style={{ background: "radial-gradient(at center, #eee, #cde)" }}
                className={`flex items-center justify-center px-2 py-4
                    rounded-md transform duration-150 hover:scale-105
                    ${index !== categories.length - 1 && "mr-2"}`}
              >
                <p
                  className={`text-lg font-semibold z-0
                    ${!checked[cat] && "opacity-50"}`}
                >
                  {cat.substring(0, 1).toUpperCase() +
                    cat.substring(1, cat.length) +
                    "s"}
                </p>
                <FaCheck
                  style={{ top: 2 + "px", right: 3 + "px" }}
                  size="10"
                  className={`${!checked[cat] && "hidden"}
                    text-green-500 z-10 absolute`}
                />
                <ImCross
                  style={{ top: 2 + "px", right: 3 + "px" }}
                  size="10"
                  className={`${checked[cat] && "hidden"}
                    text-red-400 z-10 absolute`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </form>
  );
};
export default OptionsBar;
