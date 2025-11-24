// src/components/charts/GroupedBarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GroupedBarChart({ labels = [], datasets = [], title = "" }) {
  // datasets example:
  // [
  //   { label: "2024", data: [120, 150, 180], backgroundColor: "rgba(54, 162, 235, 0.7)" },
  //   { label: "2025", data: [130, 160, 170], backgroundColor: "rgba(255, 99, 132, 0.7)" }
  // ]
  
  const data = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: {
        display: !!title,
        text: title,
        font: { size: 18, weight: "bold" },
      },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        stacked: false,
      },
      y: {
        beginAtZero: true,
        grid: { display: true },
        stacked: false,
      },
    },
  };

  return (
    <div className="w-full h-96 max-w-5xl mx-auto p-4 bg-white rounded-2xl shadow">
      <Bar data={data} options={options} />
    </div>
  );
}

export default GroupedBarChart;
