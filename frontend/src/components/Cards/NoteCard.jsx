import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  handleClick,
}) {
  return (
    <div className="group relative border border-slate-200 rounded-xl p-5 bg-white hover:shadow-lg hover:border-slate-300 transition-all duration-300 ease-out hover:-translate-y-1">
      {/* Pin indicator dot */}
      {isPinned && (
        <div className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full"></div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div onClick={handleClick} className="cursor-pointer flex-1 pr-4">
          <h6 className="text-base font-semibold text-slate-800 hover:text-blue-600 transition-colors duration-200 line-clamp-1">
            {title}
          </h6>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            {moment(date).format("MMM DD, YYYY")}
          </span>
        </div>

        <button
          onClick={onPinNote}
          className={`p-2 rounded-full transition-all duration-200 hover:bg-slate-100 ${
            isPinned
              ? "text-blue-500 hover:text-blue-600"
              : "text-slate-400 hover:text-slate-600"
          }`}
          title={isPinned ? "Unpin note" : "Pin note"}
        >
          <MdOutlinePushPin className="w-4 h-4" />
        </button>
      </div>

      <div onClick={handleClick} className="cursor-pointer">
        <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {content?.slice(0, 100)}
          {content?.length > 100 && "..."}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full"
            >
              #{tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-block px-2 py-1 text-xs font-medium text-slate-500 bg-slate-100 rounded-full">
              +{tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={onEdit}
            className="p-2 rounded-full hover:bg-green-50 text-slate-400 hover:text-green-600 transition-all duration-200"
            title="Edit note"
          >
            <MdCreate className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all duration-200"
            title="Delete note"
          >
            <MdDelete className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
