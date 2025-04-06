import React from "react";

function EmptyCard({ imgSrc, Msg }) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <img src={imgSrc} alt="No Notes" className="w-80" />
      <p className="w-1/2 text-center font-medium text-slate-700 leading-7 mt-5 mb-30">
        {Msg}
      </p>
    </div>
  );
}

export default EmptyCard;
