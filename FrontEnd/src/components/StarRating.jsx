import React from "react";
import { assets } from "../assets/assets";

const StarRating = ({ rating = 4 }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <img
            key={index}
            src={rating > index ? assets.starIconFilled : assets.starIconOutlined}
            alt="star-icon"
            className="h-4 w-4"
          />
        ))}
    </div>
  );
};

export default StarRating;