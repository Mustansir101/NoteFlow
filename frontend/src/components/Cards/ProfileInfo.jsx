import React from "react";
import { getInitials } from "../../utils/helper";
import { LogOut, User } from "lucide-react";

function ProfileInfo({ onLogout, userInfo }) {
  if (!userInfo) return null;
  return (
    <div className="flex items-center gap-3">
      {/* <div className="w-12 h-12 flex items-center justify-center rounded-full text-blue-900 bg-gradient-to-r from-blue-100 to-blue-200 shadow-sm">
        {getInitials(userInfo?.fullname)}
      </div> */}
      {/* <div>
        <p className="text-sm font-bold text-slate-700">{userInfo?.fullname}</p>
      </div> */}
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
        <User className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {userInfo?.fullname}
        </span>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
        title="Logout"
      >
        <LogOut className="h-4 w-4" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
}

export default ProfileInfo;
