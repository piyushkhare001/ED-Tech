import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-950 rounded-full animate-spin"></div>
        <h1 className="text-4xl font-bold tracking-wide text-black">Loading...</h1>
      </div>
      <p className="text-gray-800 text-lg">Please wait while we load your content</p>
    </div>
  );
};

export default LoadingPage;
