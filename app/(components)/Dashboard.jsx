"use client";
import React, { useContext, useEffect, useState } from "react";
import Details from "./Details";
import Overview from "./Overview";
import Chart from "./Charts";
import StockContext from "../context/StockContext";
import {
  fetchQuote,
  fetchStockDetails,
  fetchHistoricalData,
} from "../api/stock-api";
import {
  createDate,
  convertDateToUnixTimestamp,
} from "../helpers/date-helpers.js";

export default function Dashboard() {
  const { stockSymbol } = useContext(StockContext);
  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        console.log("Fetching stock details for:", stockSymbol);
        const result = await fetchStockDetails(stockSymbol);
        console.log("Stock details fetched:", result);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log("Error fetching stock details:", error);
      }
    };

    const updateStockOverview = async () => {
      try {
        console.log("Fetching stock quote for:", stockSymbol);
        const result = await fetchQuote(stockSymbol);
        console.log("Stock quote fetched:", result);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log("Error fetching stock quote:", error);
      }
    };

    const updateChartData = async () => {
      try {
        // Example valid date range: 1 month ago to today
        const toDate = new Date();
        const fromDate = createDate(toDate, 0, 0, -1, 0); // 1 month ago

        const from = convertDateToUnixTimestamp(fromDate);
        const to = convertDateToUnixTimestamp(toDate);

        const result = await fetchHistoricalData(stockSymbol, "D", from, to);
        console.log("Historical data fetched:", result);
        setChartData(result);
      } catch (error) {
        setChartData({});
        console.log("Error fetching historical data:", error);
      }
    };

    updateStockDetails();
    updateStockOverview();
    updateChartData();
  }, [stockSymbol]);

  return (
    <div className="text-white h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-thin">
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <h1 className="text-5xl">{stockDetails.name}</h1>
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart data={chartData} />
      </div>
      <div>
        <Overview
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails.currency}
        />
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div>
    </div>
  );
}
