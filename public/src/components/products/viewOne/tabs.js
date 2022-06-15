const Tabs = ({ tab, setTab }) => {
  return (
    <div
      className={`flex flex-row items-center h-14 px-6 bg-gray-800
      border-r border-gray-600 font-semibold border-b border-t border-gray-600`}
    >
      <button
        className={`${
          tab === "overview"
            ? "text-gray-100 border-b-3 border-yellow-500 bg-button"
            : "text-gray-300 border-b border-yellow-500 bg-gray-900"
        }
        mx-1 h-full w-24 font-semibold hover:bg-gray-700`}
        onClick={() => setTab("overview")}
      >
        Overview
      </button>
      <button
        className={`${
          tab === "reviews"
            ? "text-gray-100 border-b-3 border-yellow-500 bg-button"
            : "text-gray-300 border-b border-yellow-500 bg-gray-900"
        }
        mx-1 h-full w-24 font-semibold hover:bg-gray-700`}
        onClick={() => setTab("reviews")}
      >
        Reviews
      </button>
    </div>
  );
};

export default Tabs;
