import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [toast, setToast] = useState(null);
  const currency = "Rs";

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const value = {
    showHotelReg,
    setShowHotelReg,
    currency,
    showToast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);