"use client";
import React, { useContext, useEffect, useState } from "react";
import ChartFilter from "./ChartFilter";
import Card from "./Card";
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
} from "recharts";
import StockContext from "../context/StockContext";
import { fetchHistoricalData } from "../api/stock-api";
import { convertUnixTimestampToDate } from "../helpers/date-helpers";
import { chartConfig } from "../constants/config";

const Chart = () => {
  const [filter, setFilter] = useState("1W");
  const { stockSymbol } = useContext(StockContext);
  const [data, setData] = useState([]);

  const formatData = (data) => {
    if (!data.c || !data.t) {
      return [];
    }

    return data.c.map((item, index) => ({
      value: parseFloat(item.toFixed(2)),
      date: convertUnixTimestampToDate(data.t[index]),
    }));
  };

  useEffect(() => {
    const updateChartData = async () => {
      try {
        const resolution = chartConfig[filter].resolution;
        const result = await fetchHistoricalData(stockSymbol, resolution);
        console.log("Fetched data:", result); // For debugging
        setData(formatData(result));
      } catch (error) {
        setData([]);
        console.log("Error fetching historical data:", error);
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item);
              }}
            />
          </li>
        ))}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fill="rgb(199 210 254)"
            fillOpacity={1}
            strokeWidth={0.5}
          />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
