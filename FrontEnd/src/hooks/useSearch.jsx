// hooks/useSearch.js
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { roomsDummyData } from "../assets/assets";

const useSearch = (locationSearch = "") => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL params
  const urlCity = searchParams.get("city") || "";
  const urlSearch = searchParams.get("search") || "";
  const urlDest = searchParams.get("destination") || "";
  const urlCheckIn = searchParams.get("checkIn") || "";
  const urlCheckOut = searchParams.get("checkOut") || "";
  const urlGuests = searchParams.get("guests") || "";

  // Local filter state
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

  // Sync city pill as a "room type" isn't needed here — city comes from URL

  const handleRoomTypeChange = (checked, label) => {
    setSelectedRoomTypes((prev) =>
      checked ? [...prev, label] : prev.filter((r) => r !== label),
    );
  };

  const handlePriceRangeChange = (checked, label) => {
    // label arrives as "Rs 0 to 500" — strip the "Rs " prefix
    const range = label.replace("Rs ", "");
    setSelectedPriceRanges((prev) =>
      checked ? [...prev, range] : prev.filter((r) => r !== range),
    );
  };

  const handleSortChange = (checked, label) => {
    if (checked) setSelectedSort(label);
  };

  const clearFilters = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
    setSelectedSort("");
    setSearchParams({});
  };

  const activeFilterCount =
    selectedRoomTypes.length +
    selectedPriceRanges.length +
    (selectedSort ? 1 : 0);

  const filteredRooms = useMemo(() => {
    let rooms = [...roomsDummyData];

    // 1. Filter by navbar search query (hotel name)
    if (urlSearch) {
      rooms = rooms.filter((room) =>
        room.hotel.name.toLowerCase().includes(urlSearch.toLowerCase()),
      );
    }

    // 2. Filter by city (from navbar city pill or URL)
    if (urlCity) {
      rooms = rooms.filter(
        (room) => room.hotel.city.toLowerCase() === urlCity.toLowerCase(),
      );
    }

    // 3. Filter by destination (from SearchBar on AllRooms page)
    if (urlDest) {
      rooms = rooms.filter(
        (room) =>
          room.hotel.city.toLowerCase().includes(urlDest.toLowerCase()) ||
          room.hotel.name.toLowerCase().includes(urlDest.toLowerCase()) ||
          room.hotel.address.toLowerCase().includes(urlDest.toLowerCase()),
      );
    }

    // 4. Filter by room type checkboxes
    if (selectedRoomTypes.length > 0) {
      rooms = rooms.filter((room) =>
        selectedRoomTypes.some((type) =>
          room.roomType.toLowerCase().includes(type.toLowerCase()),
        ),
      );
    }

    // 5. Filter by price range checkboxes
    if (selectedPriceRanges.length > 0) {
      rooms = rooms.filter((room) => {
        return selectedPriceRanges.some((range) => {
          if (range === "7000 to 10000+") {
            return room.pricePerNight >= 7000;
          }
          const [min, max] = range.split(" to ").map(Number);
          return room.pricePerNight >= min && room.pricePerNight <= max;
        });
      });
    }

    // 6. Sort
    if (selectedSort === "Price Low to High") {
      rooms.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (selectedSort === "Price High to Low") {
      rooms.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (selectedSort === "Newest First") {
      rooms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return rooms;
  }, [
    urlSearch,
    urlCity,
    urlDest,
    selectedRoomTypes,
    selectedPriceRanges,
    selectedSort,
  ]);

  return {
    filteredRooms,
    selectedRoomTypes,
    selectedPriceRanges,
    selectedSort,
    activeFilterCount,
    handleRoomTypeChange,
    handlePriceRangeChange,
    handleSortChange,
    clearFilters,
    urlSearch,
    urlCity,
  };
};

export default useSearch;
