import React, { useEffect } from "react";
import { cities } from "../assets/assets";
import HotelCard from "../components/HotelCard";
import Title from "../components/Title";
import useSearch from "../hooks/useSearch";

const Rooms = () => {
  const {
    filteredRooms,
    selectedCity,
    setSelectedCity,
    selectedSort,
    handleSortChange,
    clearFilters,
  } = useSearch();

  useEffect(() => {
    window.scrollTo(0, 10);
  }, []);

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 min-h-screen pt-32 pb-20">
      <Title
        title="All Destinations"
        subTitle="Browse our complete collection of exceptional properties around the world."
      />

      {/* Filter + Sort Bar */}
      <div className="flex flex-col gap-4 mt-10 w-full">
        <div className="flex items-center justify-between gap-4">
          {/* Sort + Clear */}
          <div className="flex items-center gap-3 ml-auto">
            <select
              value={selectedSort}
              onChange={(e) => handleSortChange(true, e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-600 outline-none bg-white cursor-pointer"
            >
              <option value="">Sort By</option>
              <option value="Price Low to High">Price Low to High</option>
              <option value="Price High to Low">Price High to Low</option>
              <option value="Newest First">Newest First</option>
            </select>

            {(selectedCity !== "All" || selectedSort) && (
              <button
                onClick={clearFilters}
                className="px-4 py-1.5 text-sm border border-gray-300 rounded-full bg-white text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* City Filter Pills */}
        <div
          className="flex items-center gap-3 overflow-x-auto pb-2 w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            onClick={() => setSelectedCity("All")}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm border transition-all cursor-pointer ${
              selectedCity === "All"
                ? "bg-black text-white border-black"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            All
          </button>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm border transition-all cursor-pointer ${
                selectedCity === city
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-gray-500 text-sm mt-4 mr-auto">
        {filteredRooms.length}{" "}
        {filteredRooms.length === 1 ? "property" : "properties"} found
        {selectedCity !== "All" && ` in ${selectedCity}`}
      </p>

      {/* Room Cards */}
      {filteredRooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 gap-4">
          <p className="text-gray-500">
            No properties found. Try a different city or filter.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full">
          {filteredRooms.map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;