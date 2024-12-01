"use client";

import "../globals.css";
import React, { useState } from "react";
import UpArrowIcon from "./UpArrowIcon";
import XMarkIcon from "./XMarkIcon";
import SearchResults from "./SearchResults";
import { searchSymbol } from "../api/stock-api";

export default function Footer() {
  const [isFocused, setFocused] = useState(false);
  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState([]);

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const btnClicked = () => {
    updateBestMatches();
  };

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbol(input);
        const result = searchResults.result;
        setBestMatches(result);
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  return (
    <>
      <footer
        className={`fixed ${
          isFocused ? "expanded" : "notexpanded"
        } transition-all duration-300 ease-in-out md:border-2 border-gray-700  md:rounded-3xl bottom-1 md:bottom-10 left-1/2 transform -translate-x-1/2 p-3 `}
      >
        <div className="flex">
          <textarea
            className="w-full p-2  bg-[#0e131f] rounded-md resize-none outline-none text-white text-xl no-scrollbar"
            placeholder="Stocks Name"
            rows={1}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={input}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                updateBestMatches();
              }
            }}
          ></textarea>
          {input && (
            <button
              onClick={clear}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <XMarkIcon />
            </button>
          )}
          <button
            onClick={btnClicked}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <UpArrowIcon />
          </button>

          {input && bestMatches.length > 0 ? (
            <SearchResults results={bestMatches} />
          ) : null}
        </div>
      </footer>
    </>
  );
}
