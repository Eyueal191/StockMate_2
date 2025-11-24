// src/components/charts/LineChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function LineChart({
  labels = [],
  dataPoints = [],
  borderColor = "rgba(54, 162, 235, 1)",
  backgroundColor = "rgba(54, 162, 235, 0.2)",
}) {
  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        fill: true,
        borderColor,
        backgroundColor,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 4, // Bolder line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        titleFont: { weight: "bold" },  // Tooltip title bold
        bodyFont: { weight: "bold" },   // Tooltip values bold
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { weight: "bold" } }, // Bold x-axis labels (categories)
      },
      y: {
        beginAtZero: true,
        grid: { display: true },
        ticks: { font: { weight: "bold" } }, // Bold y-axis labels (values)
      },
    },
  };

  return (
    <div className="w-full min-h-[60vh] mx-auto p-4 bg-white rounded-2xl shadow">
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
