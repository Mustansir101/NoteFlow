import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function SearchBar({ value, onChange, handleSearch, onClearSearch, userInfo }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!value) onClearSearch();
      handleSearch();
    }
  };

  if (!userInfo) return null;
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md ">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass
        onClick={handleSearch}
        className="text-slate-400 cursor-pointer hover:text-black"
      />
    </div>
  );
}

export default SearchBar;
