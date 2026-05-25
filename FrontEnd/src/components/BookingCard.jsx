import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { formatDate } from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";
import { useAppContext } from "../context/AppContext";
import ConfirmModal from "./ConfirmModal";

const BookingCard = ({ booking, onPayNow, onCancel }) => {
  const navigate = useNavigate();
  const { currency } = useAppContext();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const isCancelled = booking.status === "cancelled";
  const isPending = booking.status === "pending";
  const isConfirmed = booking.status === "confirmed";

  return (
    <>
      {showCancelModal && (
        <ConfirmModal
          title="Cancel Booking"
          message={`Are you sure you want to cancel your booking at ${booking.hotel.name}? This action cannot be undone.`}
          confirmText="Yes, Cancel Booking"
          cancelText="Keep Booking"
          confirmStyle="bg-red-500 hover:bg-red-600 text-white"
          onConfirm={() => {
            onCancel(booking._id);
            setShowCancelModal(false);
          }}
          onCancel={() => setShowCancelModal(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t">

        {/* Hotel Details */}
        <div className="flex flex-col md:flex-row">
          <img
            src={booking.room.images[0]}
            alt="hotel-img"
            onClick={() => navigate(`/rooms/${booking.room._id}`)}
            className="min-md:w-44 rounded shadow object-cover max-w-[12rem] max-h-[10rem] cursor-pointer hover:opacity-90 transition-all"
          />
          <div className="flex flex-col ml-7 gap-1.5 max-w-[14rem] max-md:mt-3 min-md:ml-4">
            <p className="font-playfair text-2xl">
              {booking.hotel.name}
              <span className="font-inter text-sm">
                {" "}
                ({booking.room.roomType})
              </span>
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <img src={assets.locationIcon} alt="location-icon" />
              <span>{booking.hotel.address}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <img src={assets.guestsIcon} alt="guests-icon" />
              <span>Guests: {booking.guests}</span>
            </div>
            <p className="text-base mt-1">
              {formatPrice(booking.totalPrice, currency)}
            </p>
            {/* Status Badge */}
            <span
              className={`w-fit px-2 py-0.5 text-xs rounded-full font-medium ${
                isConfirmed
                  ? "bg-green-100 text-green-700"
                  : isPending
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {booking.status.charAt(0).toUpperCase() +
                booking.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
          <div>
            <p>Check-In:</p>
            <p className="text-gray-500 text-sm">
              {formatDate(booking.checkInDate)}
            </p>
          </div>
          <div>
            <p>Check-Out:</p>
            <p className="text-gray-500 text-sm">
              {formatDate(booking.checkOutDate)}
            </p>
          </div>
        </div>

        {/* Payment Section */}
        <div className="flex flex-col items-center justify-center pt-3 gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`h-3 w-3 rounded-full flex-shrink-0 ${
                booking.isPaid ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <p
              className={`text-sm ${
                booking.isPaid ? "text-green-500" : "text-red-500"
              }`}
            >
              {booking.isPaid ? "Paid" : "Unpaid"}
            </p>
          </div>

          {/* Pay Now — only if unpaid and not cancelled */}
          {!booking.isPaid && !isCancelled && (
            <button
              onClick={() => onPayNow(booking)}
              className="px-4 py-1.5 text-sm border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
            >
              Pay Now
            </button>
          )}

          {/* View Room */}
          <button
            onClick={() => navigate(`/rooms/${booking.room._id}`)}
            className="px-4 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-all cursor-pointer"
          >
            View Room
          </button>

          {/* Cancel — only if not already cancelled */}
          {!isCancelled && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="px-4 py-1.5 text-sm border border-red-300 text-red-500 rounded-full hover:bg-red-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}

          {/* Cancelled label */}
          {isCancelled && (
            <p className="text-xs text-red-400 font-medium">
              Booking Cancelled
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingCard;