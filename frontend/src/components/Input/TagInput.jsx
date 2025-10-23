import React from "react";
import { MdAdd, MdClose } from "react-icons/md";

function TagInput({ tags, setTags, isViewMode }) {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      {/* Display Tags */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors duration-200"
            >
              <span className="text-blue-600">#</span>
              {tag}
              {!isViewMode && (
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 p-0.5 rounded-full hover:bg-blue-200 transition-colors duration-200"
                  title={`Remove ${tag} tag`}
                >
                  <MdClose className="w-3 h-3 text-blue-600" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Add New Tag Input */}
      {!isViewMode && (
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 outline-none transition-all duration-200 focus:bg-white focus:border-[#2B85FF] focus:ring-2 focus:ring-blue-100 hover:border-gray-300"
              placeholder="Type a tag and press Enter..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            className="flex items-center justify-center w-10 h-10 bg-[#2B85FF] hover:bg-blue-600 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
            onClick={addNewTag}
            title="Add tag"
            disabled={!inputValue.trim()}
          >
            <MdAdd className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Empty State for View Mode */}
      {isViewMode && tags.length === 0 && (
        <div className="text-sm text-gray-500 italic">
          No tags added to this note
        </div>
      )}
    </div>
  );
}

export default TagInput;
