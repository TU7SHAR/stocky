import React, { useState } from "react";

export default function Navbar() {
  const [showBubbles, setShowBubbles] = useState(false);

  const toggleBubbles = () => {
    setShowBubbles(!showBubbles);
  };

  return (
    <nav className="fixed w-40vw top-4 right-2 z-10">
      <div
        className="ml-4 px-4 py-2 bg-[#191f31] rounded-2xl text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
        onClick={toggleBubbles}
      >
        Credits
      </div>
      {showBubbles && (
        <div className="absolute top-16 right-0 flex flex-col items-end space-y-2">
          <div className="bubble bg-[#191f31] text-white px-3 py-1 rounded-full">
            AI
          </div>
          <div className="bubble bg-[#191f31] text-white px-3 py-1 rounded-full">
            Tushar
          </div>
        </div>
      )}
    </nav>
  );
}
