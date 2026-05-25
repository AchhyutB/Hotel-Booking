/**
 * Format a date string or Date object to a readable string
 * @param {string | Date} date
 * @returns {string} e.g. "Mon Apr 10 2025"
 */
export const formatDate = (date) => {
  return new Date(date).toDateString();
};

/**
 * Format a date to local Nepali format
 * @param {string | Date} date
 * @returns {string} e.g. "4/10/2025"
 */
export const formatDateNP = (date) => {
  return new Date(date).toLocaleDateString("en-NP");
};

/**
 * Get number of nights between two dates
 * @param {string} checkIn
 * @param {string} checkOut
 * @returns {number}
 */
export const getNights = (checkIn, checkOut) => {
  return Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  );
};

/**
 * Get today's date in YYYY-MM-DD format for date input min
 * @returns {string}
 */
export const getTodayString = () => {
  return new Date().toISOString().split("T")[0];
};