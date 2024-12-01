import React, { useContext } from "react";
import StockContext from "../context/StockContext";

export default function SearchResults({ results }) {
  const { setStockSymbol } = useContext(StockContext);
  return (
    <ul className="absolute bottom-20 text-white border-2 w-full rounded-md h-64 overflow-y-scroll bg-[#0e131f] border-[#0e131f] custom">
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className="cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-[#161c2e]"
            onClick={() => {
              setStockSymbol(item.symbol);
            }}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        );
      })}
    </ul>
  );
}
