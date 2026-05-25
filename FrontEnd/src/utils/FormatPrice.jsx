/**
 * Format a price with currency symbol
 * @param {number} price
 * @param {string} currency
 * @returns {string} e.g. "Rs 9,500"
 */
export const formatPrice = (price, currency = "Rs") => {
  return `${currency} ${price.toLocaleString("en-NP")}`;
};

/**
 * Calculate total price for a stay
 * @param {number} pricePerNight
 * @param {number} nights
 * @returns {number}
 */
export const calculateTotalPrice = (pricePerNight, nights) => {
  return pricePerNight * nights;
};

/**
 * Format price per night string
 * @param {number} price
 * @param {string} currency
 * @returns {string} e.g. "Rs 9,500 /night"
 */
export const formatPricePerNight = (price, currency = "Rs") => {
  return `${currency} ${price.toLocaleString("en-NP")} /night`;
};