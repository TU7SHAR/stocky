const basePath = "https://finnhub.io/api/v1";
const apiKey = "ct5f1thr01qp3i3cn5r0ct5f1thr01qp3i3cn5rg";

export const searchSymbol = async (query) => {
  const url = `${basePath}/search?q=${query}&token=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const fetchStockDetails = async (stockSymbol) => {
  const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const fetchQuote = async (stockSymbol) => {
  const url = `${basePath}/quote?symbol=${stockSymbol}&token=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
};

export const fetchHistoricalData = async (
  stockSymbol,
  resolution,
  from,
  to
) => {
  var from = Math.floor(new Date("2024-11-15").getTime() / 1000);
  var to = Math.floor(new Date("2024-11-15").getTime() / 1000);
  const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${apiKey}`;
  console.log("Fetching historical data with URL:", url); // For debugging
  const response = await fetch(url);
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    console.log(message); // For debugging throw new Error(message); }
    return await response.json();
  }
};
