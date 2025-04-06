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
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md ">
      <input
        type="text"
        placeholder="Search notes by title, content, or tags..."
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
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
