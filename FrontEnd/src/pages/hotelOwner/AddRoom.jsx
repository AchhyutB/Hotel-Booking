import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const AddRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  // Check if editing existing room
  const editingRoom = location.state?.room || null;
  const isEditing = !!editingRoom;

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [input, setInput] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (editingRoom) {
      setInput({
        roomType: editingRoom.roomType,
        pricePerNight: editingRoom.pricePerNight,
        amenities: {
          "Free WiFi": editingRoom.amenities.includes("Free WiFi"),
          "Free Breakfast": editingRoom.amenities.includes("Free Breakfast"),
          "Room Service": editingRoom.amenities.includes("Room Service"),
          "Mountain View": editingRoom.amenities.includes("Mountain View"),
          "Pool Access": editingRoom.amenities.includes("Pool Access"),
        },
      });
    }
  }, [editingRoom]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate at least one image when adding new room
    if (!isEditing) {
      const uploadedImages = Object.values(images).filter(Boolean);
      if (uploadedImages.length === 0) {
        showToast("Please upload at least one room image.", "error");
        return;
      }
    }

    // Validate room type
    if (!input.roomType) {
      showToast("Please select a room type.", "error");
      return;
    }

    // Validate price
    if (!input.pricePerNight || input.pricePerNight <= 0) {
      showToast("Please enter a valid price per night.", "error");
      return;
    }

    // Get selected amenities
    const selectedAmenities = Object.keys(input.amenities).filter(
      (key) => input.amenities[key]
    );

    if (isEditing) {
      // Placeholder for update API call
      console.log("Updating room:", {
        id: editingRoom._id,
        roomType: input.roomType,
        pricePerNight: input.pricePerNight,
        amenities: selectedAmenities,
      });
      showToast("Room updated successfully!", "success");
    } else {
      // Placeholder for add API call
      console.log("Adding room:", {
        roomType: input.roomType,
        pricePerNight: input.pricePerNight,
        amenities: selectedAmenities,
        images: Object.values(images).filter(Boolean),
      });
      showToast("Room added successfully!", "success");
    }

    // Reset form and go back to list
    setImages({ 1: null, 2: null, 3: null, 4: null });
    setInput({
      roomType: "",
      pricePerNight: 0,
      amenities: {
        "Free WiFi": false,
        "Free Breakfast": false,
        "Room Service": false,
        "Mountain View": false,
        "Pool Access": false,
      },
    });

    navigate("/owner/list-room");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title
        align="left"
        font="outfit"
        title={isEditing ? "Edit Room" : "Add Room"}
        subTitle={
          isEditing
            ? "Update the room details, pricing, and amenities below."
            : "Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience."
        }
      />

      {/* Upload Area For Images — only show when adding */}
      {!isEditing && (
        <>
          <p className="text-gray-800 mt-10">Images</p>
          <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
            {Object.keys(images).map((key) => (
              <label htmlFor={`roomImage${key}`} key={key}>
                <img
                  className="max-h-14 cursor-pointer opacity-80"
                  src={
                    images[key]
                      ? URL.createObjectURL(images[key])
                      : assets.uploadArea
                  }
                  alt="upload-area"
                />
                <input
                  type="file"
                  accept="image/*"
                  id={`roomImage${key}`}
                  hidden
                  onChange={(e) =>
                    setImages({ ...images, [key]: e.target.files[0] })
                  }
                />
              </label>
            ))}
          </div>
        </>
      )}

      {/* Show existing images when editing */}
      {isEditing && editingRoom.images && (
        <>
          <p className="text-gray-800 mt-10">Current Images</p>
          <div className="flex gap-4 my-2 flex-wrap">
            {editingRoom.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`room-img-${index}`}
                className="max-h-14 rounded object-cover opacity-80"
              />
            ))}
          </div>
        </>
      )}

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            value={input.roomType}
            onChange={(e) =>
              setInput({ ...input, roomType: e.target.value })
            }
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div className="mt-4 text-gray-800">
          <p>
            Price <span className="text-xs">/night (Rs.)</span>
          </p>
          <input
            type="number"
            placeholder="0"
            min={0}
            max={9999999999}
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            value={input.pricePerNight}
            onChange={(e) =>
              setInput({ ...input, pricePerNight: e.target.value })
            }
          />
        </div>
      </div>

      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {Object.keys(input.amenities).map((amenity, index) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id={`amenity${index + 1}`}
              checked={input.amenities[amenity]}
              onChange={() =>
                setInput({
                  ...input,
                  amenities: {
                    ...input.amenities,
                    [amenity]: !input.amenities[amenity],
                  },
                })
              }
            />
            <label htmlFor={`amenity${index + 1}`}>{amenity}</label>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-8">
        <button
          type="submit"
          className="bg-primary text-white px-8 py-2 rounded cursor-pointer hover:bg-primary-dull transition-all"
        >
          {isEditing ? "Update Room" : "Add Room"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => navigate("/owner/list-room")}
            className="px-8 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddRoom;