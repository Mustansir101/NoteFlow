import React, { useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function SearchBar({ value, onChange, handleSearch, onClearSearch, userInfo }) {
  useEffect(() => {
    if (!value) onClearSearch();
    else handleSearch();
  }, [value]);

  if (!userInfo) return null;

  return (
    <div className="group relative w-80 flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
      {/* Search Icon */}
      <FaMagnifyingGlass className="text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200 mr-3 flex-shrink-0" />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search notes by title, content, or tags..."
        className="w-full text-sm bg-transparent outline-none placeholder-slate-500 text-slate-700 h-full"
        value={value}
        onChange={onChange}
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={onClearSearch}
          className="ml-3 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all duration-200 flex-shrink-0"
          title="Clear search"
        >
          <IoMdClose className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
