// src/components/bars/FilterSalesByDateBar.jsx
import React, { useState, useContext } from "react";
import { StockContext } from "../../stockContext/StockContext.jsx";

function FilterSalesByDateBar() {
  const { setLowerDate, setUpperDate,  refetchSaleList} = useContext(StockContext);

  // Local state only
  const [tempLowerDate, setTempLowerDate] = useState("");
  const [tempUpperDate, setTempUpperDate] = useState("");

  const handleFilter = async() => {
    setLowerDate(tempLowerDate);
    setUpperDate(tempUpperDate);
    await refetchSaleList()
  };

  const handleClear = async() => {
    setTempLowerDate("");
    setTempUpperDate("");
    setLowerDate("");
    setUpperDate("");
await refetchSaleList()
  };
  return (
    <div className="py-6 items-center xl:ml-[2vw]">
      {/* Title with improved font and separator */}
      <h1 className="hidden md:block text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center gap-3 mb-4">
        <span>Filter Sale Records by Date Range</span>
        <span className="w-12 h-1 bg-gray-400 rounded-full mt-5"></span>
      </h1>
      <h1 className="md:hidden text-3xl md:text-4xl font-extrabold text-gray-900 flex items-center gap-3 mb-4">
        <span>Filter Sale By Date</span>
        <span className="w-12 h-1 bg-gray-400 rounded-full mt-5"></span>
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:items-center bg-gray-50 rounded-xl shadow-md justify-center border-2 border-gray-300 lg:mr-[15vw] p-4 mt-4">

        {/* From Date */}
        <div className="flex flex-col">
          <label className="text-sm md:text-base lg:text-lg font-medium text-gray-700">From:</label>
          <input
            type="date"
            value={tempLowerDate}
            onChange={(e) => setTempLowerDate(e.target.value)}
            className="
              border-2 border-gray-700 rounded-lg
              px-3 py-2
              text-sm md:text-base lg:text-lg
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
              transition
            "
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col">
          <label className="text-sm md:text-base lg:text-lg font-medium text-gray-700">To:</label>
          <input
            type="date"
            value={tempUpperDate}
            onChange={(e) => setTempUpperDate(e.target.value)}
            className="
              border-2 border-gray-700 rounded-lg
              px-3 py-2
              text-sm md:text-base lg:text-lg
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
              transition
            "
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2 md:mt-4">
          <button
            onClick={handleFilter}
            className="
              bg-blue-600 text-white
              px-4 py-2 md:px-5 md:py-2 lg:px-6 lg:py-3
              text-sm md:text-base lg:text-lg
              rounded-lg hover:bg-blue-700 transition
            "
          >
            Filter
          </button>
          <button
            onClick={handleClear}
            className="
              bg-gray-300 text-gray-700
              px-4 py-2 md:px-5 md:py-2 lg:px-6 lg:py-3
              text-sm md:text-base lg:text-lg
              rounded-lg hover:bg-gray-400 transition
            "
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterSalesByDateBar;
