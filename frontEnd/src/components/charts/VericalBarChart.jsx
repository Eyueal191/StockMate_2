import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../Loading.jsx";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

function VerticalBarChart({ labels = [], values = [] }) {
  const [isReady, setIsReady] = useState(false);
  const [filteredData, setFilteredData] = useState({ labels: [], values: [] });

  const colors = [
    "#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6",
    "#06B6D4", "#F43F5E", "#84CC16", "#D946EF", "#0EA5E9",
  ];

  useEffect(() => {
    const filtered = labels.map((label, i) => ({
      label: label || "Unknown",
      value: typeof values[i] === "number" && values[i] > 0 ? values[i] : 0
    }));

    setFilteredData({
      labels: filtered.map((item) => item.label),
      values: filtered.map((item) => item.value),
    });

    const timeout = setTimeout(() => setIsReady(true), 200);
    return () => clearTimeout(timeout);
  }, [labels, values]);

  if (!isReady) return (
    <div className="flex justify-center items-center h-full py-12">
      <Loading />
    </div>
  );

  if (!filteredData.labels.length) return (
    <div className="flex justify-center items-center h-full py-12 text-gray-500">
      No categories to display.
    </div>
  );

  const data = {
    labels: filteredData.labels,
    datasets: [
      {
        label: "", // remove tooltip title
        data: filteredData.values,
        backgroundColor: filteredData.values.map((_, i) => colors[i % colors.length]),
        borderRadius: 4,
        borderWidth: 1,
        barThickness: 40,
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    indexAxis: "x",
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 40, // <-- vertical padding to prevent label cut-off
        bottom: 20,
        left: 10,
        right: 10,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false, // disable tooltip
      },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#000",
        rotation: -45,
        font: (ctx) => {
          const barWidth = ctx.chart.getDatasetMeta(0).data[ctx.dataIndex].width;
          return { size: Math.max(10, Math.min(barWidth * 0.35, 14)), weight: "bold" };
        },
        formatter: (value) => (value > 0 ? value : ""),
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#374151",
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
          font: { weight: 500 },
        },
        categoryPercentage: 0.6,
        barPercentage: 1,
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(156,163,175,0.2)" },
        ticks: { color: "#374151", font: { weight: 500 } },
      },
    },
  };

  const containerMinWidth = Math.max(600, filteredData.labels.length * 60);

  return (
    <div className="w-full h-full overflow-x-auto overflow-y-auto rounded-lg p-2 max-h-[60vh]">
      <div
        className="bg-white shadow-lg rounded-2xl p-6"
        style={{ minWidth: containerMinWidth, minHeight: "400px" }}
      >
        <Bar data={data} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
}

export default VerticalBarChart;
