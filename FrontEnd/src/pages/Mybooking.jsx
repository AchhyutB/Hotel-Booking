import React, { useState } from "react";
import Title from "../components/Title";
import { userBookingsDummyData } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import BookingCard from "../components/BookingCard";

const Mybooking = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(userBookingsDummyData);

  const handlePayNow = (booking) => {
    navigate("/payment", { state: { booking } });
  };

  const handleCancel = (bookingId) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === bookingId
          ? { ...booking, status: "cancelled" }
          : booking
      )
    );
    showToast("Booking cancelled successfully.", "info");
  };

  return (
    <div className="py-28 md:pb-36 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div className="w-1/3">Hotels</div>
          <div className="w-1/3 ml-[4.3rem]">Date & Timings</div>
          <div className="w-1/3 ml-[3.3rem]">Payments</div>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <p className="text-gray-500">You have no bookings yet.</p>
            <button
              onClick={() => navigate("/rooms")}
              className="px-6 py-2.5 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition-all cursor-pointer"
            >
              Browse Hotels
            </button>
          </div>
        ) : (
          bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onPayNow={handlePayNow}
              onCancel={handleCancel}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Mybooking;