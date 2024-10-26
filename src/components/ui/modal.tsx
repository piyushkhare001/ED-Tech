import React from "react";

const Modal = ({ modalState, closeModal }) => {
  const { isOpen, title, desc } = modalState;

  return (
    <>
      {/* Modal content */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-red-500 p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
              <button
                className="bg-white text-red-500 font-bold py-2 px-2 w-fit h-fit rounded"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </button>
            </div>
            <p className="text-white mb-4">{desc}</p>
            <button className="bg-red-500 border-solid border-2 border-white text-white font-bold py-2 px-2 w-fit h-fit rounded">Delete</button>
            <button className="mx-2 bg-white text-red-500 font-bold py-2 px-2 w-fit h-fit rounded" onClick={closeModal}>Cancel</button>
            {/* Close button */}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
