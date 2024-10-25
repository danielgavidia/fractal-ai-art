import React from "react";

type FullscreenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const FullscreenModal: React.FC<FullscreenModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          className="absolute top-4 right-4 text-white text-2xl p-2 hover:text-neutral-400"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="bg-white p-2 max-w-lg mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default FullscreenModal;
