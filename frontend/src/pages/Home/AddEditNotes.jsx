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
        className="w-10 h-10 flex items-center justify-center absolute rounded-full -top-3 -right-3 cursor-pointer"
        onClick={onClose}
      >
        <MdClose className="text-2xl text-slate-500" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none "
          placeholder="Go to Gym at 5am"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          readOnly={type === "view"}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          readOnly={type === "view"}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} isViewMode={type === "view"} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      {type !== "view" && (
        <button
          className="btn-primary font-medium mt-5 p-3"
          onClick={handleAddNote}
        >
          {type === "edit" ? "UPDATE" : "ADD"}
        </button>
      )}
    </div>
  );
}

export default AddEditNotes;
