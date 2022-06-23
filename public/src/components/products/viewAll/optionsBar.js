// Import basics
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// Import dispatch actions
import { getProducts } from "../../../actions/productActions.js";
// Import components
import { FaSearch, FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TextInput } from "@mantine/core";

const OptionsBar = ({ queryString = "" }) => {
  // Set a search term and toggle-able item categories
  const [keyword, setKeyword] = useState(queryString);
  const { categories } = useSelector((state) => state.productList);
  const catArr = Object.keys(categories);

  // When a category is clicked, update the listed products
  const dispatch = useDispatch();
  const onCategoryToggle = (cat) => {
    const bodyCategories = {
      ...categories,
      [cat]: !categories[cat],
    };
    dispatch(getProducts(keyword.trim(), "", bodyCategories));
  };

  // Send the search query on click/submission
  const history = useHistory();
  const onSearch = (e) => {
    e.preventDefault();
    dispatch(getProducts(keyword.trim(), "", categories));
    if (keyword.trim()) {
      history.push(`/merch/search/${keyword.trim()}`);
    } else {
      history.push(`/merch`);
    }
  };

  return (
    <form
      onSubmit={onSearch}
      className={`mx-auto mt-6 mb-12 flex items-center 
      justify-center flex-wrap md:flex-nowrap`}
    >
      <TextInput
        placeholder="Search"
        name="keyword"
        value={keyword}
        radius="md"
        size="xs"
        className="w-44 -mr-2"
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button
        type="submit"
        style={{ background: "radial-gradient(at center, #789, #345)" }}
        className={`z-10 p-4 text-yellow-500 rounded-full transform duration-150
          hover:scale-105 border-2 border-yellow-600`}
      >
        <FaSearch size="25" />
      </button>

      <div className="-ml-1 md:mt-0 mt-4 w-full md:w-auto">
        <div className={`flex flex-row items-center justify-center w-full`}>
          {/* trapezoid to connect the search button and category options */}
          <div className="flex flex-col h-12 md:w-14 w-0 ">
            <svg
              className={"h-4 w-full"}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,100 C50,100 50,0 100,0 L 100,100 Z"
                fill="rgb(55 65 81)"
              />
            </svg>
            <div className="h-full bg-gray-700" />
            <svg
              className={"h-4 w-full"}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 C50,0 50,100 100,100 L 100,0 Z"
                fill="rgb(55 65 81)"
              />
            </svg>
          </div>

          <div
            className={` h-12 grid grid-cols-3 p-2 rounded-lg md:rounded-l-none bg-gray-700`}
          >
            {catArr.map((cat, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  name={cat}
                  onClick={() => onCategoryToggle(cat)}
                  style={{
                    background: "radial-gradient(at center, #eee, #cde)",
                  }}
                  className={`h-8 flex items-center justify-center px-2 py-4
                    rounded-md transform duration-150 hover:scale-105
                    ${index !== catArr.length - 1 && "mr-2"}`}
                >
                  <p
                    className={`text-lg font-semibold z-0
                    ${!categories[cat] && "opacity-50"}`}
                  >
                    {cat.substring(0, 1).toUpperCase() +
                      cat.substring(1, cat.length) +
                      "s"}
                  </p>
                  <FaCheck
                    style={{ top: 2 + "px", right: 3 + "px" }}
                    size="10"
                    className={`${!categories[cat] && "hidden"}
                    text-green-500 z-10 absolute`}
                  />
                  <ImCross
                    style={{ top: 2 + "px", right: 3 + "px" }}
                    size="10"
                    className={`${categories[cat] && "hidden"}
                    text-red-400 z-10 absolute`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
};
export default OptionsBar;
