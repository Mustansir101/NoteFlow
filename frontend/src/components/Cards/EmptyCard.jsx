import React from "react";

function EmptyCard({ imgSrc, Msg }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-md text-center">
        <img
          src={imgSrc}
          alt="No Notes"
          className="w-48 h-48 mx-auto mb-6 opacity-80"
        />
        <p className="text-gray-600 text-lg leading-relaxed font-medium">
          {Msg}
        </p>
      </div>
    </div>
  );
}

export default EmptyCard;
