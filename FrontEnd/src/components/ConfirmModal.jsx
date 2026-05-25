import React from "react";

const ConfirmModal = ({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmStyle = "bg-red-500 hover:bg-red-600 text-white",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-xl max-w-sm w-full mx-4 p-6 relative">
        <h2 className="font-playfair text-xl text-gray-800">{title}</h2>
        <p className="text-gray-500 text-sm mt-2">{message}</p>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded text-sm font-medium transition-all cursor-pointer ${confirmStyle}`}
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all cursor-pointer text-gray-700"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;