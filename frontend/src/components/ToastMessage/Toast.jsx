import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

function Toast({ isShown, msg, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [isShown, onClose]);
  return (
    <>
      <div
        className={`fixed bottom-5 right-6 transition-all ease-in-out duration-100 ${
          isShown ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`min-w-52 bg-white border border-slate-300 shadow-xl rounded-md after:w-[5px] after:h-full ${
            type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
          } after:fixed after:top-0 after:left-0 after:rounded-l-lg`}
        >
          <div className="flex items-center gap-3 py-2 px-4">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                type === "delete" ? "bg-red-100" : "bg-green-100"
              }`}
            >
              {type === "delete" ? (
                <MdDeleteOutline className="text-xl text-red-500" />
              ) : (
                <LuCheck className="text-xl text-green-500" />
              )}
            </div>

            <p className="text-sm text-slate-800">{msg}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Toast;
