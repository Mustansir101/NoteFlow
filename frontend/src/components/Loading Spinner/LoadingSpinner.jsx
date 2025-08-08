import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
