import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets, cities } from "../assets/assets";
import { getTodayString } from "../utils/FormatDate";

const SearchBar = ({ initialValues = {} }) => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState(
    initialValues.destination || ""
  );
  const [checkIn, setCheckIn] = useState(initialValues.checkIn || "");
  const [checkOut, setCheckOut] = useState(initialValues.checkOut || "");
  const [guests, setGuests] = useState(initialValues.guests || 1);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      destination,
      checkIn,
      checkOut,
      guests,
    }).toString();

    navigate(`/rooms?${query}`);
    scrollTo(0, 0);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col md:flex-row items-center gap-3 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.08)] px-4 py-3 w-full max-w-4xl"
    >
      {/* Destination */}
      <div className="flex flex-col flex-1 min-w-0">
        <label className="text-xs text-gray-400 font-medium mb-1">
          Destination
        </label>
        <div className="flex items-center gap-2">
          <img src={assets.locationIcon} alt="" className="h-4 flex-shrink-0" />
          <input
            list="searchDestinations"
            type="text"
            className="w-full text-sm outline-none text-gray-700 placeholder-gray-400"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <datalist id="searchDestinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="w-px h-10 bg-gray-200 max-md:hidden" />

      {/* Check In */}
      <div className="flex flex-col flex-1 min-w-0">
        <label className="text-xs text-gray-400 font-medium mb-1">
          Check In
        </label>
        <div className="flex items-center gap-2">
          <img src={assets.calenderIcon} alt="" className="h-4 flex-shrink-0" />
          <input
            type="date"
            className="w-full text-sm outline-none text-gray-700"
            min={getTodayString()}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut && e.target.value >= checkOut) setCheckOut("");
            }}
          />
        </div>
      </div>

      <div className="w-px h-10 bg-gray-200 max-md:hidden" />

      {/* Check Out */}
      <div className="flex flex-col flex-1 min-w-0">
        <label className="text-xs text-gray-400 font-medium mb-1">
          Check Out
        </label>
        <div className="flex items-center gap-2">
          <img src={assets.calenderIcon} alt="" className="h-4 flex-shrink-0" />
          <input
            type="date"
            className="w-full text-sm outline-none text-gray-700"
            min={checkIn || getTodayString()}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>

      <div className="w-px h-10 bg-gray-200 max-md:hidden" />

      {/* Guests */}
      <div className="flex flex-col w-20">
        <label className="text-xs text-gray-400 font-medium mb-1">
          Guests
        </label>
        <div className="flex items-center gap-2">
          <img src={assets.guestsIcon} alt="" className="h-4 flex-shrink-0" />
          <input
            type="number"
            min={1}
            max={10}
            className="w-full text-sm outline-none text-gray-700"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm hover:bg-gray-800 active:scale-95 transition-all cursor-pointer max-md:w-full flex-shrink-0"
      >
        <img src={assets.searchIcon} alt="" className="h-4 invert" />
        Search
      </button>
    </form>
  );
};

export default SearchBar;