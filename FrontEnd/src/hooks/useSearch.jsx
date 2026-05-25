import { useState, useEffect } from "react";
import { roomsDummyData } from "../assets/assets";

const useSearch = (locationSearch = "") => {
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [filteredRooms, setFilteredRooms] = useState(roomsDummyData);

  // Read destination from query params
  const params = new URLSearchParams(locationSearch);
  const destination = params.get("destination") || "";

  // Sync selectedCity with destination query param on mount
  useEffect(() => {
    if (destination) {
      // Try to match destination to a known city
      const matchedCity = roomsDummyData.find((room) =>
        room.hotel.city.toLowerCase() === destination.toLowerCase()
      );
      if (matchedCity) {
        setSelectedCity(matchedCity.hotel.city);
      } else {
        // Not a known city — keep as All and filter by address/name
        setSelectedCity("All");
      }
    }
  }, [destination]);

  useEffect(() => {
    let rooms = [...roomsDummyData];

    // Unified location filter —
    // priority: selectedCity pill > destination query param
    if (selectedCity !== "All") {
      rooms = rooms.filter(
        (room) =>
          room.hotel.city.toLowerCase() === selectedCity.toLowerCase()
      );
    } else if (destination) {
      // Destination doesn't match a known city
      // so search by address or hotel name
      rooms = rooms.filter(
        (room) =>
          room.hotel.city
            .toLowerCase()
            .includes(destination.toLowerCase()) ||
          room.hotel.address
            .toLowerCase()
            .includes(destination.toLowerCase()) ||
          room.hotel.name
            .toLowerCase()
            .includes(destination.toLowerCase())
      );
    }

    // Filter by room type
    if (selectedRoomTypes.length > 0) {
      rooms = rooms.filter((room) =>
        selectedRoomTypes.some((type) =>
          room.roomType.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    // Filter by price range
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

    // Sort
    if (selectedSort === "Price Low to High") {
      rooms.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (selectedSort === "Price High to Low") {
      rooms.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (selectedSort === "Newest First") {
      rooms.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilteredRooms(rooms);
  }, [
    selectedRoomTypes,
    selectedPriceRanges,
    selectedSort,
    selectedCity,
    destination,
  ]);

  const handleRoomTypeChange = (checked, label) => {
    setSelectedRoomTypes((prev) =>
      checked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };

  const handlePriceRangeChange = (checked, label) => {
    const raw = label.replace("Rs ", "");
    setSelectedPriceRanges((prev) =>
      checked ? [...prev, raw] : prev.filter((item) => item !== raw)
    );
  };

  const handleSortChange = (checked, label) => {
    if (checked) setSelectedSort(label);
  };

  const clearFilters = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
    setSelectedSort("");
    setSelectedCity("All");
  };

  const activeFilterCount =
    selectedRoomTypes.length +
    selectedPriceRanges.length +
    (selectedSort ? 1 : 0) +
    (selectedCity !== "All" ? 1 : 0);

  return {
    filteredRooms,
    selectedRoomTypes,
    selectedPriceRanges,
    selectedSort,
    selectedCity,
    setSelectedCity,
    activeFilterCount,
    destination,
    handleRoomTypeChange,
    handlePriceRangeChange,
    handleSortChange,
    clearFilters,
  };
};

export default useSearch;