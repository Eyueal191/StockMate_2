// src/components/bars/SaleSearchBar.jsx
import React, { useState, useContext, useMemo, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { StockContext } from "../../stockContext/StockContext.jsx";
import { Search, X } from "lucide-react";

const SaleSearchBar = () => {
  const { setSearchSale } = useContext(StockContext);
  const [query, setQuery] = useState("");

  // Debounced function for search
  const debouncedSetSearchSale = useMemo(
    () => debounce((value) => setSearchSale(value), 500),
    [setSearchSale]
  );

  useEffect(() => {
    return () => debouncedSetSearchSale.cancel();
  }, [debouncedSetSearchSale]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSetSearchSale(value);
  };

  const handleSearchNow = useCallback(() => {
    debouncedSetSearchSale.cancel();
    setSearchSale(query);
  }, [query, setSearchSale, debouncedSetSearchSale]);

  const clearSearch = useCallback(() => {
    debouncedSetSearchSale.cancel();
    setQuery("");
    setSearchSale("");
  }, [debouncedSetSearchSale, setSearchSale]);

  return (
    <div
      role="search"
      aria-label="Search sales"
      className="
        flex items-center
        w-full max-w-full
        sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
        bg-white border border-gray-300
        rounded-lg shadow-sm
        px-3 py-1.5 sm:px-3.5 sm:py-2 lg:px-4 lg:py-2
        gap-2
        mx-auto
        transition focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-300
      "
    >
      {/* Input */}
      <input
        type="text"
        placeholder="Search Sale's Record by Seller or Item Name..."
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearchNow();
          if (e.key === "Escape") clearSearch();
        }}
        className="
          flex-1 bg-transparent outline-none
          text-sm sm:text-sm lg:text-base
          placeholder-gray-400 text-gray-900
          px-1
        "
      />

      {/* Clear button */}
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Clear search"
          title="Clear"
          className="
            flex items-center justify-center
            p-1 rounded-md
            hover:bg-gray-100 active:bg-gray-200
            transition
          "
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
        </button>
      )}

      {/* Search button */}
      <button
        type="button"
        onClick={handleSearchNow}
        aria-label="Search"
        title="Search"
        className="
          flex items-center justify-center
          p-2 rounded-md
          bg-blue-50 hover:bg-blue-100 active:bg-blue-200
          transition
        "
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
      </button>
    </div>
  );
};

export default SaleSearchBar;
