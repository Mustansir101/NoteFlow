import React from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

function AddEditNotes({ noteData, type, onClose, getAllNotes, showToast }) {
  const [title, setTitle] = React.useState(noteData?.title || "");
  const [content, setContent] = React.useState(noteData?.content || "");
  const [tags, setTags] = React.useState(noteData?.tags || []);
  const [error, setError] = React.useState(null);

  // Api Calls
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToast("Note added successfully", "add");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const editNode = async () => {
    try {
      const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToast("Note updated successfully", "update");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const handleAddNote = () => {
    if (!title || !content) {
      setError("Please fill in all the fields.");
      return;
    }
    setError("");
    if (type === "edit") {
      editNode();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative outline-none">
      {/* Modal Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {type === "view"
              ? "View Note"
              : type === "edit"
              ? "Edit Note"
              : "Add New Note"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {type === "view"
              ? "Reading mode - click edit to make changes"
              : type === "edit"
              ? "Make your changes and click update"
              : "Create a new note to capture your thoughts"}
          </p>
        </div>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={onClose}
          title="Close modal"
        >
          <MdClose className="text-xl" />
        </button>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Title Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full text-xl font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none transition-all duration-200 ${
              type === "view"
                ? "cursor-default"
                : "focus:bg-white focus:border-[#2B85FF] focus:ring-2 focus:ring-blue-100 hover:border-gray-300"
            }`}
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            readOnly={type === "view"}
          />
        </div>

        {/* Content Textarea */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full min-h-[200px] text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none transition-all duration-200 resize-none ${
              type === "view"
                ? "cursor-default"
                : "focus:bg-white focus:border-[#2B85FF] focus:ring-2 focus:ring-blue-100 hover:border-gray-300"
            }`}
            placeholder="Write your note content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            readOnly={type === "view"}
            rows={8}
          />
        </div>

        {/* Tags Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Tags
            <span className="text-xs font-normal text-gray-500 ml-2">
              (Press Enter to add tags)
            </span>
          </label>
          <TagInput
            tags={tags}
            setTags={setTags}
            isViewMode={type === "view"}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-red-400 mr-3"></div>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal Footer */}
      {type !== "view" && (
        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 bg-gradient-to-r from-[#2B85FF] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transform hover:scale-105 active:scale-95"
            onClick={handleAddNote}
          >
            {type === "edit" ? "Update Note" : "Create Note"}
          </button>
        </div>
      )}

      {/* View Mode Footer */}
      {type === "view" && (
        <div className="flex items-center justify-center mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default AddEditNotes;
