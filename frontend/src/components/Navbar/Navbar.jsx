import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Navbar({ userInfo, onSearch, getAllNotes, setIsSearch }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const navigate = useNavigate();
  const onLogout = async () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) onSearch(searchQuery);
  };

  const onClearSearch = () => {
    setSearchQuery("");
    setIsSearch(false);
    getAllNotes();
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2
        onClick={() => navigate("/dashboard")}
        className="text-xl font-medium text-black py-2 cursor-pointer"
      >
        Notes
      </h2>

      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        userInfo={userInfo}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
}

export default Navbar;
