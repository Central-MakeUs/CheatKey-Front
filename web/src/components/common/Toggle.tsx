import { useState } from "react";

export const Toggle = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        onClick={handleToggle}
        role="switch"
        aria-checked={isToggled}
        className={`bg-base-75 relative inline-block h-6 w-10 cursor-pointer rounded-full p-0.5 transition-all duration-300`}
      >
        <div
          className={`absolute h-5 w-5 rounded-full transition-transform duration-300 ease-in-out ${
            isToggled
              ? "bg-primary-400 translate-x-4 transform"
              : "bg-gray-system-600"
          }`}
        ></div>
      </div>
    </div>
  );
};
