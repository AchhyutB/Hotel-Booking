import React, { useState } from "react";
import { assets, facilityIcons } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import StarRating from "../components/StarRating";
import useSearch from "../hooks/useSearch";
import SearchBar from "../components/SearchBar";

const ROOMS_PER_PAGE = 4;

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openFilters, setOpenFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 4000",
    "4000 to 7000",
    "7000 to 10000+",
  ];
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  const {
    filteredRooms,
    selectedRoomTypes,
    selectedPriceRanges,
    selectedSort,
    activeFilterCount,
    handleRoomTypeChange,
    handlePriceRangeChange,
    handleSortChange,
    clearFilters,
  } = useSearch(location.search);

  // Pagination logic
  const totalPages = Math.ceil(filteredRooms.length / ROOMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROOMS_PER_PAGE;
  const currentRooms = filteredRooms.slice(
    startIndex,
    startIndex + ROOMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filteredRooms.length]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-36 px-4 md:px-16 lg:px-24">
      <div className="flex-1 w-full">
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">
            Hotel Rooms
          </h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <SearchBar
            initialValues={{
              destination:
                new URLSearchParams(location.search).get("destination") || "",
              checkIn:
                new URLSearchParams(location.search).get("checkIn") || "",
              checkOut:
                new URLSearchParams(location.search).get("checkOut") || "",
              guests:
                new URLSearchParams(location.search).get("guests") || 1,
            }}
          />
        </div>

        {/* Results Count */}
        {filteredRooms.length > 0 && (
          <p className="text-gray-500 text-sm mt-6">
            Showing{" "}
            <span className="font-medium text-gray-800">
              {startIndex + 1}–
              {Math.min(startIndex + ROOMS_PER_PAGE, filteredRooms.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-800">
              {filteredRooms.length}
            </span>{" "}
            properties
          </p>
        )}

        {filteredRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16 gap-4">
            <img
              src={assets.searchIcon}
              alt="no-results"
              className="h-12 opacity-20"
            />
            <p className="text-gray-500">
              No rooms match your search. Try adjusting the filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {currentRooms.map((room) => (
              <div
                key={room._id}
                className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-600/20 last:border-0"
              >
                <img
                  onClick={() =>
                    navigate(`/rooms/${room._id}`, scrollTo(0, 0))
                  }
                  src={room.images[0]}
                  alt="hotel-img"
                  title="View Room Details"
                  className="max-h-64 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
                />
                <div className="md:w-1/2 flex flex-col gap-2">
                  <p className="text-gray-500">{room.hotel.city}</p>
                  <p
                    onClick={() =>
                      navigate(`/rooms/${room._id}`, scrollTo(0, 0))
                    }
                    className="text-gray-800 text-3xl font-playfair cursor-pointer"
                  >
                    {room.hotel.name}
                  </p>
                  <div className="flex items-center">
                    <StarRating />
                    <p className="ml-2">200+ Reviews</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                    <img src={assets.locationIcon} alt="location-icon" />
                    <span>{room.hotel.address}</span>
                  </div>

                  <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                    {room.amenities.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                      >
                        <img
                          src={facilityIcons[item]}
                          alt={item}
                          className="w-6 h-6"
                        />
                        <p className="text-xs">{item}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xl font-medium text-gray-700">
                    Rs {room.pricePerNight} /night
                  </p>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 py-10">
                {/* Previous */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 text-sm rounded transition-all cursor-pointer ${
                        currentPage === page
                          ? "bg-black text-white"
                          : "border border-gray-300 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Filter */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
            openFilters && "border-b"
          }`}
        >
          <div className="flex items-center gap-2">
            <p className="text-base font-medium text-gray-800">FILTERS</p>
            {activeFilterCount > 0 && (
              <span className="lg:hidden flex items-center justify-center h-5 w-5 text-xs rounded-full bg-blue-600 text-white font-medium">
                {activeFilterCount}
              </span>
            )}
          </div>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setOpenFilters(!openFilters)}
              className="lg:hidden"
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
            <span onClick={clearFilters} className="hidden lg:block">
              CLEAR
              {activeFilterCount > 0 && (
                <span className="ml-1 text-blue-600">
                  ({activeFilterCount})
                </span>
              )}
            </span>
          </div>
        </div>

        <div
          className={`${
            openFilters
              ? "h-auto"
              : "h-0 lg:h-auto overflow-hidden transition-all duration-700"
          }`}
        >
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={selectedRoomTypes.includes(room)}
                onChange={handleRoomTypeChange}
              />
            ))}
          </div>

          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`Rs ${range}`}
                selected={selectedPriceRanges.includes(range)}
                onChange={handlePriceRangeChange}
              />
            ))}
          </div>

          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onChange={handleSortChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;