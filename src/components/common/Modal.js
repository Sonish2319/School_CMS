// import React, { useEffect } from "react";

// const Modal = ({ isOpen, onClose, children }) => {
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Light semi-transparent black background */}
//       <div className="absolute inset-0 bg-black/30 z-0"></div>

//       {/* Modal box */}
//       <div className="relative z-10 bg-white rounded-lg w-[90%] max-w-[600px] mx-auto">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-3 sm:top-4 sm:right-6 text-[20px] sm:text-[24px] md:text-[30px] text-gray-400 font-light hover:text-gray-500 hover:cursor-pointer"
//         >
//           &times;
//         </button>
//         {children}
//       </div>

//     </div>
//   );
// };

// export default Modal;


import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Modal box with scrollable content */}
      <div className="relative z-10 bg-white rounded-lg w-full max-w-[600px] max-h-[90vh] overflow-y-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 sm:top-4 sm:right-6 text-[20px] sm:text-[24px] md:text-[30px] text-gray-400 font-light hover:text-gray-500 hover:cursor-pointer"
        >
          &times;
        </button>

        {/* Push down content to not overlap close button */}
        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
