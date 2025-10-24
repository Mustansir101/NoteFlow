import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { BookOpen, User } from "lucide-react";

function Navbar({
  userInfo,
  onSearch = () => {},
  getAllNotes = () => {},
  setIsSearch = () => {},
}) {
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
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-lg border-b border-slate-200/60 shadow-lg px-32">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo Section */}
        <div className="flex items-center group">
          <div className="relative flex items-center justify-center w-10 h-10 mr-3 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300">
            <BookOpen className="h-5 w-5 text-white" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-purple-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-xl font-semibold text-slate-800 hover:text-blue-600 transition-colors duration-200 outline-none rounded-lg px-2 py-1 relative"
          >
            NoteFlow
            <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
        </div>

        {/* Search Section */}
        <div className="flex-1 flex justify-center max-w-md mx-8">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
            userInfo={userInfo}
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center">
          <div className="relative">
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
