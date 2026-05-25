import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";
import { userBookingsDummyData, cities } from "../assets/assets";
import { formatDate } from "../utils/FormatDate";
import { formatPrice } from "../utils/FormatPrice";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const Profile = () => {
  const { user } = useUser();
  const { currency, showToast } = useAppContext();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const bookings = userBookingsDummyData;

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "bookings", label: "My Bookings" },
    { id: "settings", label: "Settings" },
  ];

  const handleSave = async () => {
    setLoading(true);

    // Placeholder for API call
    console.log("Updating profile:", { name, phone, city });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setIsEditing(false);
    showToast("Profile updated successfully!", "success");
  };

  return (
    <div className="py-28 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 min-h-screen">
      <Title
        title="My Profile"
        subTitle="Manage your personal information, bookings and preferences"
        align="left"
      />

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-10 bg-white border border-gray-200 rounded-xl p-6 max-w-4xl">
        <img
          src={user?.imageUrl}
          alt="profile"
          className="h-24 w-24 rounded-full object-cover border-4 border-gray-100 shadow"
        />
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="font-playfair text-2xl text-gray-800">
            {user?.fullName}
          </p>
          <p className="text-gray-500 text-sm">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-100 font-medium">
              Verified Member
            </span>
            <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200 font-medium">
              {bookings.length} Bookings
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mt-8 border-b border-gray-200 max-w-4xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 text-sm font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? "border-b-2 border-black text-gray-800"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8 max-w-4xl">

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <p className="font-medium text-gray-800 text-lg">
                Personal Information
              </p>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-4 py-1.5 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="text-sm text-gray-500 font-medium">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-black transition-all"
                  />
                ) : (
                  <p className="mt-1 text-gray-800 text-sm">
                    {user?.fullName || "Not set"}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-500 font-medium">
                  Email
                </label>
                <p className="mt-1 text-gray-800 text-sm">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-500 font-medium">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-black transition-all"
                  />
                ) : (
                  <p className="mt-1 text-gray-800 text-sm">
                    {phone || "Not set"}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="text-sm text-gray-500 font-medium">
                  City
                </label>
                {isEditing ? (
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-black transition-all"
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="mt-1 text-gray-800 text-sm">
                    {city || "Not set"}
                  </p>
                )}
              </div>

              {/* Member Since */}
              <div>
                <label className="text-sm text-gray-500 font-medium">
                  Member Since
                </label>
                <p className="mt-1 text-gray-800 text-sm">
                  {user?.createdAt
                    ? formatDate(user.createdAt)
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="flex flex-col gap-4">
            {bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 bg-white border border-gray-200 rounded-xl">
                <p className="text-gray-500">No bookings yet.</p>
                <button
                  onClick={() => navigate("/rooms")}
                  className="px-6 py-2.5 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition-all cursor-pointer"
                >
                  Browse Hotels
                </button>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex flex-col md:flex-row items-start gap-4 bg-white border border-gray-200 rounded-xl p-4"
                >
                  <img
                    src={booking.room.images[0]}
                    alt="room"
                    className="w-full md:w-36 h-28 rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="font-playfair text-lg text-gray-800">
                      {booking.hotel.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {booking.room.roomType}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span>
                        Check-In: {formatDate(booking.checkInDate)}
                      </span>
                      <span>
                        Check-Out: {formatDate(booking.checkOutDate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-medium text-gray-800 text-sm">
                        {formatPrice(booking.totalPrice, currency)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            booking.isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {booking.isPaid ? "Paid" : "Unpaid"}
                        </span>
                        {!booking.isPaid && (
                          <button
                            onClick={() =>
                              navigate("/payment", {
                                state: { booking },
                              })
                            }
                            className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
                          >
                            Pay Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="font-medium text-gray-800 text-lg mb-6">
              Account Settings
            </p>

            <div className="flex flex-col gap-4">
              {/* Notifications */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-gray-800 text-sm font-medium">
                    Email Notifications
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Receive booking confirmations and offers
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
  <div className="relative">
    <input
      type="checkbox"
      defaultChecked
      className="sr-only peer"
    />
    <div className="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-200" />
    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
  </div>
</label>
                <label className="relative inline-flex items-center cursor-pointer">
  <div className="relative">
    <input
      type="checkbox"
      className="sr-only peer"
    />
    <div className="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-200" />
    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
  </div>
</label>
                <label className="relative inline-flex items-center cursor-pointer">
  <div className="relative">
    <input
      type="checkbox"
      defaultChecked
      className="sr-only peer"
    />
    <div className="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-200" />
    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
  </div>
</label>
              </div>

              {/* SMS */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-gray-800 text-sm font-medium">
                    SMS Notifications
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Receive booking updates via SMS
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-200">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
                  </div>
                </label>
              </div>

              {/* Newsletter */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-gray-800 text-sm font-medium">
                    Newsletter
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Receive travel inspiration and special offers
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-200">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
                  </div>
                </label>
              </div>

              {/* Delete Account */}
              <div className="flex items-center justify-between py-3 mt-2">
                <div>
                  <p className="text-red-500 text-sm font-medium">
                    Delete Account
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Permanently delete your account and all data
                  </p>
                </div>
                <button
                  onClick={() =>
                    showToast(
                      "Please contact support to delete your account.",
                      "info"
                    )
                  }
                  className="px-4 py-1.5 text-sm border border-red-300 text-red-500 rounded-full hover:bg-red-50 transition-all cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;