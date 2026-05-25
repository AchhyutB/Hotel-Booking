import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, roomsDummyData } from "../assets/assets";
import { useUser, UserButton, SignInButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { setShowHotelReg } = useAppContext();

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchInputRef = useRef(null);

  const isDark = isScrolled || location.pathname !== "/";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
    ...(isSignedIn ? [{ name: "My Bookings", path: "/my-booking" }] : []),
  ];

  useEffect(() => {
    if (!isSignedIn) {
      setShowHotelReg(false);
      setIsMenuOpen(false);
    }
  }, [isSignedIn]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleDashboardClick = () => {
    if (location.pathname.includes("owner")) {
      navigate("/owner");
    } else {
      setShowHotelReg(true);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
    setSearchQuery("");
  };

  const performSearch = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    const nameMatches = roomsDummyData.filter((room) =>
      room.hotel.name.toLowerCase().includes(q)
    );

    const cityMatch = roomsDummyData.find((room) =>
      room.hotel.city.toLowerCase().includes(q)
    );

    if (nameMatches.length === 1) {
      navigate(`/rooms/${nameMatches[0]._id}`);
    } else if (nameMatches.length > 1) {
      navigate(`/rooms?search=${encodeURIComponent(q)}`);
    } else if (cityMatch) {
      navigate(`/rooms?city=${encodeURIComponent(cityMatch.hotel.city)}`);
    } else {
      navigate("/rooms");
    }

    setIsSearchOpen(false);
    setSearchQuery("");
    setIsMenuOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") performSearch(searchQuery);
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 ${
        isDark
          ? "bg-white/80 backdrop-blur-lg shadow-md py-3 md:py-4"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className={`h-9 transition-all duration-300 ${isDark ? "invert opacity-80" : ""}`}
        />
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center ml-7 gap-6 lg:gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`group flex flex-col text-sm ${isDark ? "text-gray-700" : "text-white"}`}
          >
            {link.name}
            <span
              className={`h-[2px] w-0 group-hover:w-full transition-all duration-300 ${
                isDark ? "bg-black" : "bg-white"
              }`}
            />
          </Link>
        ))}
        {user && (
          <button
            onClick={handleDashboardClick}
            className={`border rounded-full px-4 py-1 text-sm transition-all duration-200 hover:scale-105 ${
              isDark ? "border-black text-black" : "border-white text-white"
            }`}
          >
            Dashboard
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search hotels or cities..."
            className={`transition-all duration-300 rounded-full text-sm outline-none border px-3 py-1 ${
              isDark
                ? "border-gray-300 bg-white text-gray-800 placeholder-gray-400"
                : "border-white/60 bg-white/20 text-white placeholder-white/70"
            } ${isSearchOpen ? "w-52 opacity-100" : "w-0 opacity-0 px-0 border-0"}`}
          />
          <img
            src={assets.searchIcon}
            alt="Search"
            onClick={handleSearchToggle}
            className={`h-6 cursor-pointer transition-all duration-300 ${isDark ? "invert" : ""} ${
              isSearchOpen ? "opacity-50" : "opacity-100"
            }`}
          />
        </div>

        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal">
            <button className="px-8 py-2.5 rounded-full bg-white text-black transition-all duration-500 ease-in-out hover:bg-black hover:text-white active:scale-95 cursor-pointer">
              Login
            </button>
          </SignInButton>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon}
          alt="Menu"
          className={`h-5 cursor-pointer transition-all duration-200 hover:scale-110 ${
            isDark ? "invert" : ""
          }`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-white flex flex-col items-center justify-center gap-10 text-gray-800 font-medium transition-all duration-500 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-5 right-5">
          <img src={assets.closeIcon} alt="Close" className="h-6 cursor-pointer" />
        </button>

        {/* Mobile Search */}
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && performSearch(searchQuery)}
            placeholder="Search hotels or cities..."
            className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          />
          <img
            src={assets.searchIcon}
            alt="Search"
            className="h-4 opacity-50 cursor-pointer"
            onClick={() => performSearch(searchQuery)}
          />
        </div>

        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-gray-500 transition-all duration-200"
          >
            {link.name}
          </Link>
        ))}

        {user && (
          <button
            onClick={() => { handleDashboardClick(); setIsMenuOpen(false); }}
            className="border border-black rounded-full px-5 py-2 text-sm transition-all duration-200 hover:bg-black hover:text-white"
          >
            Dashboard
          </button>
        )}

        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal">
            <button className="px-8 py-2.5 rounded-full border border-gray-500 bg-white text-black transition-all duration-200 ease-in-out hover:bg-black hover:text-white active:scale-95 cursor-pointer">
              Login
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;