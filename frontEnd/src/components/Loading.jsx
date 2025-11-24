import React from 'react';
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 w-full">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 font-medium text-lg animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};
export default Loading;
