import React from "react";

export default function Card({ children }) {
  return (
    <>
      <div className="w-full h-full rounded-md relative p-8 border-2 bg-[#191f31] text-white border-[#0e131f]">
        {children}
      </div>
    </>
  );
}
