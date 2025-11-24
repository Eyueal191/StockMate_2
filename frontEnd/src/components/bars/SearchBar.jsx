import React, { useState, useContext, useMemo, useCallback } from "react";
import { debounce } from "lodash";
import { StockContext } from "../../stockContext/StockContext.jsx";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const { setSearchItem } = useContext(StockContext);
  const [query, setQuery] = useState("");

  // debounce wrapper (stable)
  const debouncedSetSearchItem = useMemo(
    () => debounce((value) => setSearchItem(value), 500),
    [setSearchItem]
  );

  React.useEffect(() => {
    return () => debouncedSetSearchItem.cancel();
  }, [debouncedSetSearchItem]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSetSearchItem(value);
  };

  const handleSearchNow = useCallback(() => {
    debouncedSetSearchItem.cancel();
    setSearchItem(query);
  }, [query, setSearchItem, debouncedSetSearchItem]);

  const clear = () => {
    debouncedSetSearchItem.cancel();
    setQuery("");
    setSearchItem("");
  };

  return (
    <div
      className="
        flex items-center
        w-full max-w-full
        sm:max-w-md
        md:max-w-lg
        lg:max-w-xl
        xl:max-w-2xl
        bg-white border border-gray-200
        rounded-lg shadow-sm
        transition
        focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-blue-300
        px-3 py-1.5 sm:px-3.5 sm:py-2 lg:px-4 lg:py-2
        gap-2
        mx-auto
      "
      role="search"
      aria-label="Search items"
    >
      {/* Text input */}
      <input
        type="text"
        aria-label="Search items"
        placeholder="Search items..."
        value={query}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearchNow();
          if (e.key === "Escape") clear();
        }}
        className="
          flex-1 bg-transparent outline-none
          text-sm sm:text-sm lg:text-base
          placeholder-gray-400 text-gray-800
          px-1
        "
      />

      {/* Clear button */}
      {query && (
        <button
          type="button"
          onClick={clear}
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
export default SearchBar;
