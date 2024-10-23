import { useState, useEffect } from "react";

export default function Alert({ color = "blue", message, visible }) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible); // Update visibility if the prop changes
  }, [visible]);

  if (!isVisible) return null; // Don't render if the alert is not visible

  const alertColors = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    gray: "bg-gray-500",
  };

  const selectedColor = alertColors[color] || alertColors["blue"];

  return (
    <div
      className={`fixed z-[1000] top-24 right-4 w-1/3 ${selectedColor} text-white px-4 py-3 rounded shadow-lg`}
    >
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-300 focus:outline-none"
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
    </div>
  );
}
