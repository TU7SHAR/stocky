import React from "react";
import Card from "./Card";

export default function Analysis({ symbol, price, change }) {
  if (symbol === undefined || price === undefined || change === undefined) {
    symbol = "Api Denied";
    price = "Api Denied";
    change = "Api Denied";
  }

  const isDataAvailable = symbol !== "Api Denied";

  const formatChange = (change) => {
    return change > 0
      ? `+${change.toFixed(3)}`
      : change < 0
      ? `${change.toFixed(3)}`
      : `${change}`;
  };

  return (
    <Card>
      <div className="font-thin text-3xl m-1 border-b-2 border-gray-400 pb-2 mb-4">
        Analysis
      </div>
      {isDataAvailable ? (
        <div className="space-y-4 p-4">
          <div className="text-xl flex justify-between items-center">
            <span className="font-semibold">Symbol:</span>
            <p className="font-thin"> {symbol} </p>
          </div>
          <div className="text-xl flex justify-between items-center">
            <span className="font-semibold">Change:</span>
            <p
              className={`font-thin ${
                change !== "Api Denied" &&
                (change > 0 ? "text-green-500" : "text-red-500")
              }`}
            >
              {change !== "Api Denied" ? formatChange(change) : change}
            </p>
          </div>
          <div className="text-xl flex justify-between items-center">
            <span className="font-semibold">Price:</span>
            <p className="font-thin">
              {price !== "Api Denied" ? `${price}` : price}
            </p>
          </div>
          <div
            className={`text-xl flex justify-between items-center ${
              change !== "Api Denied" &&
              (change > 0 ? "text-green-500" : "text-red-500")
            }`}
          >
            <span className="font-semibold">Trend:</span>
            <p className="font-thin">
              {change !== "Api Denied"
                ? change > 0
                  ? "Positive"
                  : "Negative"
                : "Unavailable at the moment! :("}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-xl text-white p-4">API Resource Access Denied</div>
      )}
    </Card>
  );
}
