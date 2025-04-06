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
    <div className="border border-slate-300 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div onClick={handleClick} className="cursor-pointer">
          <h6 className="text-sm font-medium hover:underline">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("Do MMMM YYYY")} {/* 4th April 2025 */}
          </span>
        </div>
        <MdOutlinePushPin
          onClick={onPinNote}
          className={`icon-btn ${
            isPinned ? "text-[#2B85FF]" : "text-slate-300"
          }`}
        />
      </div>

      <p className="text-sm text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((tag) => `#${tag} `)}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            onClick={onEdit}
            className="icon-btn hover:text-green-600"
          />
          <MdDelete
            onClick={onDelete}
            className="icon-btn hover:text-red-500"
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
