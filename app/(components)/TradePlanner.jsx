import React from "react";
import Card from "./Card";

export default function TradePlanner({ symbol, price, change }) {
  if (symbol === undefined || price === undefined || change === undefined) {
    symbol = "Api Denied";
    price = "Api Denied";
    change = "Api Denied";
  }

  const isDataAvailable = symbol !== "Api Denied";
  const priority =
    change != "Api Denied" ? (change > 0 ? "Buy" : "Sell") : "Inadeqaute Data";

  const formatChange = (change) => {
    return change > 0
      ? `+${change.toFixed(3)}`
      : change < 0
      ? `${change.toFixed(3)}`
      : `${change}`;
  };

  return (
    <Card>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <span className="font-thin text-3xl m-1 border-b-2 border-green-500 pb-2 mb-4">
            Trade
          </span>
          <span className="font-thin text-3xl m-1 border-b-2 border-red-500 pb-2 mb-4">
            Planning
          </span>
        </div>
        <button
          className={`px-4 py-2 font-bold rounded ${
            priority === "Buy"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          Priority: {priority}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-500 col-span-1 p-4 rounded-lg">
          {isDataAvailable ? (
            <div className="space-y-4">
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold">Position:</span>
                <p className="font-thin">Buy</p>
              </div>
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold">Symbol:</span>
                <p className="font-thin">{symbol}</p>
              </div>
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold">Change:</span>
                <p className="font-thin">
                  {change !== "Api Denied" ? formatChange(change) : change}
                </p>
              </div>
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold">Price:</span>
                <p className="font-thin">
                  {price !== "Api Denied" ? `${price}` : price}
                </p>
              </div>
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold">Target:</span>
                <p className="font-bold text-white">
                  {price !== "Api Denied"
                    ? `${(price + price / 200).toFixed(3)}`
                    : price}
                </p>
              </div>
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold text-red-400">SL:</span>
                <p className="font-bold text-red-500">
                  {price !== "Api Denied"
                    ? `${(price - price / 200).toFixed(3)}`
                    : price}
                </p>
              </div>
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold">View:</span>
                <p className="font-thin">
                  {price !== "Api Denied" ? "Positive" : price}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-xl text-white p-4">
              API Resource Access Denied
            </div>
          )}
        </div>
        <div className="bg-red-500 col-span-1 p-4 rounded-lg">
          {isDataAvailable ? (
            <div className="space-y-4">
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold">Position:</span>
                <p className="font-thin">Sell</p>
              </div>
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold">Symbol:</span>
                <p className="font-thin">{symbol}</p>
              </div>
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold">Change:</span>
                <p className="font-thin">
                  {change !== "Api Denied" ? formatChange(change) : change}
                </p>
              </div>
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold">Price:</span>
                <p className="font-thin">
                  {price !== "Api Denied" ? `${price}` : price}
                </p>
              </div>
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold text-green-500">Target:</span>
                <p className="font-bold text-green-500">
                  {price !== "Api Denied"
                    ? `${(price - price / 200).toFixed(3)}`
                    : price}
                </p>
              </div>
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold text-white">SL:</span>
                <p className="font-bold text-white">
                  {price !== "Api Denied"
                    ? `${(price + price / 200).toFixed(3)}`
                    : price}
                </p>
              </div>
              <div className="text-xl flex justify-between items-center">
                <span className="font-semibold">View:</span>
                <p className="font-thin">
                  {price !== "Api Denied" ? "Positive" : price}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-xl text-white p-4">
              API Resource Access Denied
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
