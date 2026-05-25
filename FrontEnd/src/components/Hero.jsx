import React, { useState } from "react";
import heroImage from "../assets/heroImage.png";
import { assets, cities } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { getTodayString } from "../utils/formatDate";
import SearchBar from "./SearchBar";

const Hero = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      destination,
      checkIn,
      checkOut,
      guests,
      rooms,
    }).toString();

    navigate(`/rooms?${query}`);
    scrollTo(0, 0);
  };

  return (
    <div
      className="flex flex-col items-start justify-center px-6
      md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <p className="bg-[#2daeff]/50 px-3.5 py-1 rounded-full mt-20">
        The Ultimate Hotel Experience
      </p>
      <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
        Discover Your Perfect Gateway Destination
      </h1>
      <p className="max-w-[26rem] mt-2 text-sm md:text-base">
        Unparalleled luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today.
      </p>

      <div className="mt-10 max-md:w-full"
        onSubmit={handleSearch}
        // className="form bg-white text-gray-500 rounded-lg px-6 py-4 mt-10 flex flex-col md:flex-row max-md:items-start gap-4 max-md:my-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            value={checkIn}
            min={getTodayString()}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut && e.target.value >= checkOut) setCheckOut("");
            }}
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="" className="h-4" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            value={checkOut}
            min={checkIn || getTodayString()}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Guests</label>
          <input
            min={1}
            max={10}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
            placeholder="0"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="rooms">Rooms</label>
          <input
            min={1}
            max={10}
            id="rooms"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
            placeholder="0"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-1 rounded-md bg-black mt-3.5 py-2.5 px-6 text-white my-auto cursor-pointer max-md:w-full max-md:py-1"
        >
          <img src={assets.searchIcon} alt="" className="h-7" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;