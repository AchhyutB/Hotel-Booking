import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <img
        src={assets.logo}
        alt="logo"
        className="h-12 invert opacity-80 mb-8"
      />
      <h1 className="font-playfair text-6xl md:text-8xl font-bold text-gray-800">
        404
      </h1>
      <p className="text-xl md:text-2xl font-playfair text-gray-600 mt-4">
        Oops! Page not found
      </p>
      <p className="text-gray-500 mt-3 max-w-md text-sm md:text-base">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all cursor-pointer text-sm"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 rounded-full bg-black text-white hover:bg-gray-800 transition-all cursor-pointer text-sm"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;