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
    <div className="relative">
      <button
        className="w-10 h-10 flex items-center justify-center absolute rounded-full -top-3 -right-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
        onClick={onClose}
      >
        <MdClose className="text-2xl text-gray-600" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label text-gray-700 font-medium">Title</label>
        <input
          type="text"
          className="text-2xl text-gray-900 outline-none border-b-2 border-gray-200 focus:border-blue-500 transition-colors duration-200 pb-1"
          placeholder="Go to Gym at 5am"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          readOnly={type === "view"}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-gray-700 font-medium">Content</label>
        <textarea
          type="text"
          className={`text-sm text-gray-800 outline-none bg-gray-50 border border-gray-200 p-2 rounded-lg overflow-hidden h-40 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            type === "view"
              ? "resize-none text-[15px]"
              : "hover:border-gray-300"
          }`}
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          readOnly={type === "view"}
        />
      </div>

      <div>
        <label className="input-label text-gray-700 font-medium">Tags</label>
        <TagInput tags={tags} setTags={setTags} isViewMode={type === "view"} />
      </div>

      {error && (
        <p className="text-red-600 text-sm pt-4 bg-red-50 p-2 rounded border border-red-200">
          {error}
        </p>
      )}

      {type !== "view" && (
        <button
          className="btn-primary font-medium mt-5 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
          onClick={handleAddNote}
        >
          {type === "edit" ? "UPDATE" : "ADD"}
        </button>
      )}
    </div>
  );
}

export default AddEditNotes;
