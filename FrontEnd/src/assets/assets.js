import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg1 from './roomImg1.png'
import roomImg2 from './roomImg2.png'
import roomImg3 from './roomImg3.png'
import roomImg4 from './roomImg4.png'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";


export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
}

export const cities = [
    "Kathmandu",
    "Pokhara",
    "Chitwan",
    "Lumbini",
    "Nagarkot",
    "Bhaktapur",
    "Janakpur",
    "Ilam",
    "Mustang",
    "Bandipur",
];

// Exclusive Offers Dummy Data
export const exclusiveOffers = [
    {
        _id: 1,
        title: "Everest Base Camp Special",
        description: "Complimentary Sherpa guide and daily Nepali thali breakfast included",
        priceOff: 25,
        expiryDate: "Aug 31",
        image: exclusiveOfferCardImg1
    },
    {
        _id: 2,
        title: "Lumbini Heritage Package",
        description: "Stay at the birthplace of Buddha — includes monastery tour and meditation session",
        priceOff: 20,
        expiryDate: "Sep 20",
        image: exclusiveOfferCardImg2
    },
    {
        _id: 3,
        title: "Chitwan Wildlife Escape",
        description: "Book 60 days ahead and save big on your jungle safari lodge stay in Chitwan.",
        priceOff: 30,
        expiryDate: "Sep 25",
        image: exclusiveOfferCardImg3
    },
]

// Testimonials Dummy Data
export const testimonials = [
    {
        id: 1,
        name: "Rajesh Shrestha",
        address: "Bhaktapur, Nepal",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
        rating: 5,
        review: "QuickStay helped me find a wonderful heritage hotel right in Thamel. Everything was authentic — the food, the staff, the views of the Boudhanath stupa. Truly memorable."
    },
    {
        id: 2,
        name: "Arjun Yadav",
        address: "Janakpur, Nepal",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
        rating: 5,
        review: "I trekked the Annapurna Circuit and QuickStay handled every stop — from Pokhara to Mustang. Seamless booking, friendly hosts, and absolutely breathtaking locations."
    },
    {
        id: 3,
        name: "Sophie Larson",
        address: "Stockholm, Sweden",
        image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
        rating: 4,
        review: "Found an excellent budget guesthouse in Chitwan through QuickStay. The jungle safari package deal was unbeatable. Will definitely use it again for my Mustang trip!"
    }
];

// Facility Icons
export const facilityIcons = {
    "Free WiFi": assets.freeWifiIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Mountain View": assets.mountainIcon,
    "Pool Access": assets.poolIcon,
};

// For Room Details Page
export const roomCommonData = [
    { icon: assets.homeIcon, title: "Clean & Safe Stay", description: "A well-maintained and hygienic space just for you." },
    { icon: assets.badgeIcon, title: "Enhanced Cleaning", description: "This host follows QuickStay's strict cleaning standards." },
    { icon: assets.locationFilledIcon, title: "Excellent Location", description: "90% of guests rated the location 5 stars." },
    { icon: assets.heartIcon, title: "Smooth Check-In", description: "100% of guests gave check-in a 5-star rating." },
];

// User Dummy Data
export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Sanjay Thapa",
    "email": "sanjay.thapa@gmail.com",
    "image": guestsIcon,
    "role": "hotelOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": ["Kathmandu", "Chitwan"]
}

// Multiple Hotels spread across Nepal
export const hotelsDummyData = [
    {
        "_id": "hotel_001",
        "name": "Thamel Heritage Boutique",
        "address": "Thamel Marg, Ward No. 26, Kathmandu",
        "contact": "+977-01-4701234",
        "owner": userDummyData,
        "city": "Kathmandu",
        "createdAt": "2025-04-10T06:22:11.663Z",
        "updatedAt": "2025-04-10T06:22:11.663Z",
        "__v": 0
    },
    {
        "_id": "hotel_002",
        "name": "Annapurna View Resort",
        "address": "Damside, Ward No. 7, Pokhara",
        "contact": "+977-061-530987",
        "owner": userDummyData,
        "city": "Pokhara",
        "createdAt": "2025-04-10T06:22:11.663Z",
        "updatedAt": "2025-04-10T06:22:11.663Z",
        "__v": 0
    },
    {
        "_id": "hotel_003",
        "name": "Jungle Breeze Lodge",
        "address": "Sauraha, Ward No. 3, Chitwan",
        "contact": "+977-056-580134",
        "owner": userDummyData,
        "city": "Chitwan",
        "createdAt": "2025-04-10T06:22:11.663Z",
        "updatedAt": "2025-04-10T06:22:11.663Z",
        "__v": 0
    },
    {
        "_id": "hotel_004",
        "name": "Buddha Garden Hotel",
        "address": "Lumbini Sacred Garden Road, Rupandehi",
        "contact": "+977-071-580276",
        "owner": userDummyData,
        "city": "Lumbini",
        "createdAt": "2025-04-10T06:22:11.663Z",
        "updatedAt": "2025-04-10T06:22:11.663Z",
        "__v": 0
    },
    {
        "_id": "hotel_005",
        "name": "Nagarkot Sunrise Inn",
        "address": "Tower Road, Nagarkot, Bhaktapur District",
        "contact": "+977-01-6680154",
        "owner": userDummyData,
        "city": "Nagarkot",
        "createdAt": "2025-04-10T06:22:11.663Z",
        "updatedAt": "2025-04-10T06:22:11.663Z",
        "__v": 0
    },
    {
        "_id": "hotel_006",
        "name": "Newari Courtyard Hotel",
        "address": "Durbar Square Area, Bhaktapur",
        "contact": "+977-01-6610432",
        "owner": userDummyData,
        "city": "Bhaktapur",
        "createdAt": "2025-04-10T06:22:11.663Z",
        "updatedAt": "2025-04-10T06:22:11.663Z",
        "__v": 0
    },
]

// Keep a single hotelDummyData pointing to the Kathmandu one (used in room/booking references)
export const hotelDummyData = hotelsDummyData[0];

// Rooms Dummy Data — each room belongs to a different hotel across Nepal
export const roomsDummyData = [
    {
        "_id": "67f7647c197ac559e4089b96",
        "hotel": hotelsDummyData[0],          // Kathmandu
        "roomType": "Deluxe Heritage Suite",
        "pricePerNight": 9500,                 // NPR
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "67f76452197ac559e4089b8e",
        "hotel": hotelsDummyData[1],          // Pokhara
        "roomType": "Mountain View Double",
        "pricePerNight": 7200,
        "amenities": ["Room Service", "Mountain View", "Pool Access"],
        "images": [roomImg2, roomImg3, roomImg4, roomImg1],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:25:22.593Z",
        "updatedAt": "2025-04-10T06:25:22.593Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "hotel": hotelsDummyData[2],          // Chitwan
        "roomType": "Jungle Facing Cottage",
        "pricePerNight": 5800,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f763d8197ac559e4089b7a",
        "hotel": hotelsDummyData[3],          // Lumbini
        "roomType": "Pilgrim Single Room",
        "pricePerNight": 3200,
        "amenities": ["Free WiFi", "Free Breakfast"],
        "images": [roomImg4, roomImg1, roomImg2, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:23:20.252Z",
        "updatedAt": "2025-04-10T06:23:20.252Z",
        "__v": 0
    },
    {
        "_id": "67f763d8197ac559e4089b7b",
        "hotel": hotelsDummyData[4],          // Nagarkot
        "roomType": "Sunrise View Suite",
        "pricePerNight": 8800,
        "amenities": ["Mountain View", "Free Breakfast", "Room Service"],
        "images": [roomImg1, roomImg3, roomImg2, roomImg4],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:23:20.252Z",
        "updatedAt": "2025-04-10T06:23:20.252Z",
        "__v": 0
    },
    {
        "_id": "67f763d8197ac559e4089b7c",
        "hotel": hotelsDummyData[5],          // Bhaktapur
        "roomType": "Newari Style Double",
        "pricePerNight": 6000,
        "amenities": ["Free WiFi", "Free Breakfast", "Room Service"],
        "images": [roomImg2, roomImg4, roomImg1, roomImg3],
        "isAvailable": true,
        "createdAt": "2025-04-10T06:23:20.252Z",
        "updatedAt": "2025-04-10T06:23:20.252Z",
        "__v": 0
    },
]

// User Bookings Dummy Data — bookings spread across different Nepal properties
export const userBookingsDummyData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": { ...userDummyData, username: "Sanjay Thapa" },
        "room": roomsDummyData[1],            // Pokhara
        "hotel": hotelsDummyData[1],
        "checkInDate": "2025-04-30T00:00:00.000Z",
        "checkOutDate": "2025-05-02T00:00:00.000Z",
        "totalPrice": 14400,                  // 2 nights × 7200
        "guests": 2,
        "status": "confirmed",
        "paymentMethod": "eSewa",
        "isPaid": true,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": { ...userDummyData, username: "Priya Sharma" },
        "room": roomsDummyData[0],            // Kathmandu
        "hotel": hotelsDummyData[0],
        "checkInDate": "2025-04-27T00:00:00.000Z",
        "checkOutDate": "2025-04-29T00:00:00.000Z",
        "totalPrice": 19000,                  // 2 nights × 9500
        "guests": 2,
        "status": "confirmed",
        "paymentMethod": "Khalti",
        "isPaid": true,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": { ...userDummyData, username: "Rajan Gurung" },
        "room": roomsDummyData[2],            // Chitwan
        "hotel": hotelsDummyData[2],
        "checkInDate": "2025-05-10T00:00:00.000Z",
        "checkOutDate": "2025-05-12T00:00:00.000Z",
        "totalPrice": 11600,                  // 2 nights × 5800
        "guests": 2,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b5",
        "user": { ...userDummyData, username: "Anita Shrestha" },
        "room": roomsDummyData[4],            // Nagarkot
        "hotel": hotelsDummyData[4],
        "checkInDate": "2025-05-20T00:00:00.000Z",
        "checkOutDate": "2025-05-21T00:00:00.000Z",
        "totalPrice": 8800,                   // 1 night × 8800
        "guests": 2,
        "status": "pending",
        "paymentMethod": "eSewa",
        "isPaid": false,
        "createdAt": "2025-04-15T08:00:00.000Z",
        "updatedAt": "2025-04-15T08:00:00.000Z",
        "__v": 0
    },
]

// Dashboard Dummy Data
export const dashboardDummyData = {
    "totalBookings": 4,
    "totalRevenue": 53800,    // NPR — sum of all bookings
    "bookings": userBookingsDummyData
}

// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/