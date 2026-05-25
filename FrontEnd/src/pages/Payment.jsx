import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { formatPrice } from "../utils/FormatPrice";
import { formatDate } from "../utils/FormatDate";
import { assets } from "../assets/assets";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currency, showToast } = useAppContext();

  const [selectedMethod, setSelectedMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  // Booking data passed via navigation state
  const booking = location.state?.booking || null;

  const paymentMethods = [
    {
      id: "esewa",
      name: "eSewa",
      description: "Pay via eSewa digital wallet",
      color: "bg-green-50 border-green-200",
      activeColor: "bg-green-100 border-green-500",
    },
    {
      id: "khalti",
      name: "Khalti",
      description: "Pay via Khalti digital wallet",
      color: "bg-purple-50 border-purple-200",
      activeColor: "bg-purple-100 border-purple-500",
    },
    {
      id: "hotel",
      name: "Pay At Hotel",
      description: "Pay in cash when you arrive",
      color: "bg-gray-50 border-gray-200",
      activeColor: "bg-gray-100 border-gray-500",
    },
  ];

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!selectedMethod) {
      showToast("Please select a payment method.", "error");
      return;
    }

    setLoading(true);

    // Placeholder for payment gateway integration
    console.log("Processing payment:", {
      method: selectedMethod,
      booking,
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setPaid(true);
    showToast("Payment successful!", "success");
  };

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-500">No booking found.</p>
        <button
          onClick={() => navigate("/my-booking")}
          className="px-6 py-2.5 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition-all cursor-pointer"
        >
          Go to My Bookings
        </button>
      </div>
    );
  }

  if (paid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
        <div className="flex flex-col items-center gap-4 bg-green-50 border border-green-200 rounded-xl p-10 max-w-md w-full">
          <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-2xl font-playfair text-gray-800">Payment Successful!</p>
          <p className="text-gray-500 text-sm text-center">
            Your booking at {booking.hotel.name} has been confirmed. Enjoy your stay!
          </p>

          {/* Receipt */}
          <div className="w-full flex flex-col gap-2 text-sm bg-white rounded-xl p-4 border border-green-100 mt-2">
            <div className="flex justify-between gap-8">
              <span className="text-gray-500">Hotel</span>
              <span className="font-medium text-gray-800">{booking.hotel.name}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-500">Room</span>
              <span className="font-medium text-gray-800">{booking.room.roomType}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-500">Check-In</span>
              <span className="font-medium text-gray-800">{formatDate(booking.checkInDate)}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-500">Check-Out</span>
              <span className="font-medium text-gray-800">{formatDate(booking.checkOutDate)}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-medium text-gray-800">
                {paymentMethods.find((m) => m.id === selectedMethod)?.name}
              </span>
            </div>
            <hr className="border-gray-200 my-1" />
            <div className="flex justify-between gap-8">
              <span className="text-gray-700 font-medium">Total Paid</span>
              <span className="font-medium text-gray-800">
                {formatPrice(booking.totalPrice, currency)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full mt-2">
            <button
              onClick={() => navigate("/my-booking")}
              className="flex-1 text-center bg-black text-white py-2.5 rounded hover:bg-gray-800 transition-all cursor-pointer text-sm font-medium"
            >
              My Bookings
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 text-center border border-gray-300 text-gray-700 py-2.5 rounded hover:bg-gray-50 transition-all cursor-pointer text-sm font-medium"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-28 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 min-h-screen">
      <h1 className="font-playfair text-3xl md:text-4xl text-gray-800">
        Complete Payment
      </h1>
      <p className="text-gray-500 mt-2 text-sm">
        Choose your preferred payment method to confirm your booking
      </p>

      <div className="flex flex-col lg:flex-row gap-8 mt-10 max-w-5xl">

        {/* Payment Methods */}
        <form
          onSubmit={handlePayment}
          className="flex-1 flex flex-col gap-4"
        >
          <p className="font-medium text-gray-800">Select Payment Method</p>
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? method.activeColor
                  : method.color
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => setSelectedMethod(method.id)}
                className="w-4 h-4"
              />
              <div>
                <p className="font-medium text-gray-800">{method.name}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </label>
          ))}

          <button
            type="submit"
            disabled={loading || !selectedMethod}
            className="bg-primary hover:bg-primary-dull transition-all text-white py-3 rounded-lg mt-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${formatPrice(booking.totalPrice, currency)}`
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-center text-gray-500 text-sm hover:text-gray-800 transition-all cursor-pointer mt-1"
          >
            Cancel and go back
          </button>
        </form>

        {/* Booking Summary */}
        <div className="lg:w-80">
          <p className="font-medium text-gray-800 mb-4">Booking Summary</p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
            <img
              src={booking.room.images[0]}
              alt="room"
              className="w-full h-44 object-cover"
            />
            <div className="p-4 flex flex-col gap-3 text-sm">
              <p className="font-playfair text-lg text-gray-800">
                {booking.hotel.name}
              </p>
              <p className="text-gray-500 text-xs">{booking.room.roomType}</p>

              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <img src={assets.locationIcon} alt="location" className="h-3" />
                <span>{booking.hotel.address}</span>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between">
                <span className="text-gray-500">Check-In</span>
                <span className="font-medium text-gray-800">
                  {formatDate(booking.checkInDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Check-Out</span>
                <span className="font-medium text-gray-800">
                  {formatDate(booking.checkOutDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Guests</span>
                <span className="font-medium text-gray-800">{booking.guests}</span>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Total</span>
                <span className="font-medium text-gray-800">
                  {formatPrice(booking.totalPrice, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;