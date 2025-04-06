import React from "react";
import { getInitials } from "../../utils/helper";

function ProfileInfo({ onLogout, userInfo }) {
  if (!userInfo) return null;
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 bg-slate-100">
        {getInitials(userInfo?.fullname)}
      </div>
      <div>
        <p className="text-sm font-medium">{userInfo?.fullname}</p>
        <button
          onClick={onLogout}
          className="cursor-pointer text-sm text-slate-700 underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
