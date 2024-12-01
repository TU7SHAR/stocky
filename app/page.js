"use client";

import Dashboard from "./(components)/Dashboard";
import Footer from "./(components)/Footer";
import Navbar from "./(components)/Navbar";
import StockContext from "./context/StockContext";
import { useState } from "react";

export default function Home() {
  const [stockSymbol, setStockSymbol] = useState("MSFT");

  return (
    <>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <div className="md:block hidden">
          <Navbar />
        </div>

        <Dashboard />
        <Footer />
      </StockContext.Provider>
    </>
  );
}
