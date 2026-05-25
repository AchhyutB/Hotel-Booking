import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  assets,
  facilityIcons,
  roomCommonData,
  roomsDummyData,
} from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import { formatDate, getNights, getTodayString } from "../utils/FormatDate";
import { formatPrice } from "../utils/FormatPrice";

const ContactModal = ({ hotel, onClose }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 p-8 relative">
        <img
          src={assets.closeIcon}
          alt="close"
          className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="font-playfair text-2xl text-gray-800">Contact Hotel</h2>
        <p className="text-gray-500 text-sm mt-1">
          Reach out directly to the hotel for inquiries
        </p>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
            <img src={assets.homeIcon} alt="hotel" className="h-5 w-5 mt-0.5 opacity-60" />
            <div>
              <p className="text-xs text-gray-500">Hotel Name</p>
              <p className="text-gray-800 font-medium">{hotel.name}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
            <img src={assets.locationIcon} alt="location" className="h-5 w-5 mt-0.5 opacity-60" />
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-gray-800 font-medium">{hotel.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
            <img src={assets.searchIcon} alt="phone" className="h-5 w-5 mt-0.5 opacity-60" />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              
                <a> href={`tel:${hotel.contact}`}
                className="text-blue-500 font-medium hover:underline"
              
                {hotel.contact}
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          
            <a> href={`tel:${hotel.contact}`}
            className="flex-1 text-center bg-primary hover:bg-primary-dull transition-all text-white py-2.5 rounded cursor-pointer text-sm font-medium"
         
            Call Now
          </a>
          <button
            onClick={onClose}
            className="flex-1 text-center border border-gray-300 hover:bg-gray-50 transition-all text-gray-700 py-2.5 rounded cursor-pointer text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const RoomDetails = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const { currency, showToast } = useAppContext();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nights, setNights] = useState(0);
  const [isBooked, setIsBooked] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rajesh Shrestha",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      rating: 5,
      date: "2025-03-15",
      comment: "Amazing stay! The room was spotless and the view was breathtaking. Staff were incredibly helpful and friendly.",
    },
    {
      id: 2,
      name: "Sophie Larson",
      image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
      rating: 4,
      date: "2025-02-20",
      comment: "Great location and comfortable beds. Breakfast was delicious. Would definitely come back!",
    },
    {
      id: 3,
      name: "Arjun Yadav",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      rating: 5,
      date: "2025-01-10",
      comment: "Absolutely loved it. The hotel has a wonderful ambiance and the service was top notch.",
    },
  ]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const foundRoom = roomsDummyData.find((room) => room._id === id);
    foundRoom && setRoom(foundRoom);
    foundRoom && setMainImage(foundRoom.images[0]);
  }, [id]);

  useEffect(() => {
    if (checkIn && checkOut && room) {
      const nightCount = getNights(checkIn, checkOut);
      if (nightCount > 0) {
        setNights(nightCount);
        setTotalPrice(nightCount * room.pricePerNight);
      } else {
        setNights(0);
        setTotalPrice(0);
      }
    }
  }, [checkIn, checkOut, room]);

  // Auto scroll to booking form if ?book=true
  useEffect(() => {
    if (search.includes("book=true") && room) {
      const form = document.getElementById("bookingForm");
      if (form) {
        form.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [search, room]);

  const handleBooking = (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      showToast("Please select check-in and check-out dates.", "error");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      showToast("Check-out date must be after check-in date.", "error");
      return;
    }

    console.log("Booking details:", {
      roomId: room._id,
      hotelId: room.hotel._id,
      checkIn,
      checkOut,
      guests,
      nights,
      totalPrice,
    });

    setIsBooked(true);
    scrollTo(0, 0);
  };

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">

        {/* Contact Modal */}
        {showContact && (
          <ContactModal
            hotel={room.hotel}
            onClose={() => setShowContact(false)}
          />
        )}

        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-inner text-sm">({room.roomType})</span>
          </h1>
          <p className="text-sm font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        {/* Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2">200+ Reviews</p>
        </div>

        {/* Room Address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="Location-icon" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Room Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Room Image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt="Room-Image"
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    mainImage === image && "outline outline-3 outline-orange-500"
                  }`}
                />
              ))}
          </div>
        </div>

        {/* Room Highlights */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                >
                  <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-2xl font-medium">
            {formatPrice(room.pricePerNight, currency)} /night
          </p>
        </div>

        {/* Booking Confirmation UI */}
        {isBooked ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mx-auto mt-16 max-w-6xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-green-700 font-medium text-lg">Booking Confirmed!</p>
                </div>
                <p className="text-gray-500 text-sm">
                  Your stay at {room.hotel.name} has been successfully booked.
                </p>
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-600 bg-white rounded-xl p-4 border border-green-100 min-w-64">
                <div className="flex justify-between gap-8">
                  <span className="text-gray-500">Room</span>
                  <span className="font-medium text-gray-800">{room.roomType}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-gray-500">Check-In</span>
                  <span className="font-medium text-gray-800">{formatDate(checkIn)}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-gray-500">Check-Out</span>
                  <span className="font-medium text-gray-800">{formatDate(checkOut)}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-gray-500">Guests</span>
                  <span className="font-medium text-gray-800">{guests}</span>
                </div>
                <div className="flex justify-between gap-8">
                  <span className="text-gray-500">Nights</span>
                  <span className="font-medium text-gray-800">{nights}</span>
                </div>
                <hr className="border-gray-200 my-1" />
                <div className="flex justify-between gap-8">
                  <span className="text-gray-700 font-medium">Total</span>
                  <span className="font-medium text-gray-800">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsBooked(false)}
              className="mt-6 px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer"
            >
              Modify Booking
            </button>
          </div>
        ) : (
          /* CheckIn CheckOut Form */
          <form
            id="bookingForm"
            onSubmit={handleBooking}
            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
          >
            <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
              <div className="flex flex-col">
                <label htmlFor="checkInDate" className="font-medium">Check-In</label>
                <input
                  type="date"
                  id="checkInDate"
                  className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                  min={getTodayString()}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (checkOut && e.target.value >= checkOut) setCheckOut("");
                  }}
                  required
                />
              </div>
              <div className="w-px h-20 bg-gray-300/70 max-md:hidden"></div>

              <div className="flex flex-col">
                <label htmlFor="checkOutDate" className="font-medium">Check-Out</label>
                <input
                  type="date"
                  id="checkOutDate"
                  className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                  min={checkIn || getTodayString()}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
              <div className="w-px h-20 bg-gray-300/70 max-md:hidden"></div>

              <div className="flex flex-col">
                <label htmlFor="guests" className="font-medium">Guests</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  id="guests"
                  className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 max-md:w-full max-md:mt-6">
              {totalPrice > 0 && (
                <p className="text-gray-500 text-sm">
                  Total:{" "}
                  <span className="font-medium text-gray-800">
                    {formatPrice(totalPrice, currency)}
                  </span>{" "}
                  for{" "}
                  <span className="font-medium text-gray-800">
                    {nights} night{nights > 1 ? "s" : ""}
                  </span>
                </p>
              )}
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full md:px-24 py-3 md:py-4 text-base cursor-pointer"
              >
                Check Availability
              </button>
            </div>
          </form>
        )}

        {/* Common Specifications */}
        <div className="space-y-4 mt-[5rem]">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <img src={spec.icon} alt={`${spec.title}-icon`} className="w-6.5" />
              <div>
                <p className="text-base">{spec.title}</p>
                <p className="text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl border-y border-gray-300 mt-10 my-15 py-10 text-gray-500">
          <p>
            Guest will be allocated on the ground floor according to
            Availability. You get a comfortable Two Bedroom apartment has a true
            city feeling. The price quoted is for two guest, at the guest slot
            please mark the number of guests to get the exact price for groups.
            The Guests will be allocated ground floor according to availability.
            You get the comfortable two bedroom apartment that has a true city
            feeling.
          </p>
        </div>

        {/* Posted By */}
        <div className="flex flex-col items-start gap-4 mt-8">
          <div className="flex gap-8">
            <img
              src={room.hotel.owner.image}
              alt="Host"
              className="h-8 w-8 md:h-16 md:w-16"
            />
            <div>
              <p className="text-lg md:text-xl">Hosted By {room.hotel.name}</p>
              <div className="flex items-center mt-1">
                <StarRating />
                <p className="ml-2">200+ Reviews</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowContact(true)}
            className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer"
          >
            Contact Now
          </button>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-playfair text-3xl text-gray-800">
                Guest Reviews
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={5} />
                <p className="text-gray-500 text-sm">{reviews.length} reviews</p>
              </div>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer"
            >
              {showReviewForm ? "Cancel" : "Write a Review"}
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
              <h3 className="font-medium text-gray-800 mb-4">Your Review</h3>

              {/* Star Rating Selector */}
              <div className="flex items-center gap-1 mb-4">
                {Array(5).fill(0).map((_, index) => (
                  <img
                    key={index}
                    src={newReview.rating > index ? assets.starIconFilled : assets.starIconOutlined}
                    alt="star"
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => setNewReview({ ...newReview, rating: index + 1 })}
                  />
                ))}
                <span className="text-gray-500 text-sm ml-2">
                  {newReview.rating} / 5
                </span>
              </div>

              <textarea
                rows={4}
                placeholder="Share your experience..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none resize-none focus:border-gray-400 transition-all"
              />

              <button
                onClick={() => {
                  if (!newReview.comment.trim()) {
                    showToast("Please write a comment.", "error");
                    return;
                  }
                  setReviews((prev) => [
                    {
                      id: prev.length + 1,
                      name: "You",
                      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
                      rating: newReview.rating,
                      date: new Date().toISOString().split("T")[0],
                      comment: newReview.comment,
                    },
                    ...prev,
                  ]);
                  setNewReview({ rating: 5, comment: "" });
                  setShowReviewForm(false);
                  showToast("Review submitted successfully!", "success");
                }}
                className="mt-4 px-6 py-2.5 bg-black text-white text-sm rounded hover:bg-gray-800 transition-all cursor-pointer"
              >
                Submit Review
              </button>
            </div>
          )}

          {/* Reviews List */}
          <div className="flex flex-col gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex items-start gap-4 pb-6 border-b border-gray-200 last:border-0"
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-800">{review.name}</p>
                    <p className="text-gray-400 text-xs">{formatDate(review.date)}</p>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="text-gray-500 text-sm mt-1">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    )
  );
};

export default RoomDetails;