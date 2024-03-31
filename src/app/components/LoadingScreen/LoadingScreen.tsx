import React from "react";

interface loadingScreenProps {
  isLoaded: boolean;
}

const LoadingScreen: React.FC<loadingScreenProps> = ({ isLoaded }) => {
  return (
    <>
      {!isLoaded ? (
        <div className="fixed z-[999] bg-white w-screen h-screen flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full absolute
          border-8 border-solid border-gray-200"
          ></div>
          <div
            className="w-12 h-12 rounded-full animate-spin absolute
          border-8 border-solid border-purple-500 border-t-transparent"
          ></div>
        </div>
      ) : undefined}
    </>
  );
};

export default LoadingScreen;
