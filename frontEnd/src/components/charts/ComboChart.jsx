// src/components/charts/ComboChart.jsx
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

function ComboChart({ title, monthOne, monthTwo, salesMonthOne, salesMonthTwo }) {
  const labels = [monthOne, monthTwo];

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: [salesMonthOne, salesMonthTwo],
        backgroundColor: ["rgba(37, 99, 235, 0.7)", "rgba(16, 185, 129, 0.7)"],
        borderRadius: 6,
        maxBarThickness: 80,      // cap bar width
        barPercentage: 1.0,       // full width of category
        categoryPercentage: 1.0,  // minimal gap
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        display: true,
        anchor: "end",
        align: "end",
        font: { weight: "bold", size: 14 },
        color: "#1f2937",
        formatter: (value, context) => `${context.dataset.label}: ${value.toLocaleString()}`,
      },
      title: {
        display: true,
        text: `Sales Comparison: ${title}`,
        font: { size: 18, weight: "700" },
        color: "#1e3a8a",
        align: "start",
        padding: { top: 10, bottom: 20 },
      },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Sales", font: { size: 14, weight: "600" } },
        ticks: { font: { size: 12 } },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        title: { display: true, text: "Month", font: { size: 14, weight: "600" } },
        ticks: { font: { size: 14, weight: "600" } },
        offset: true,  // crucial to reduce empty space around bars
      },
    },
  };

  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md border" style={{ height: "60vh" }}>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}

export default ComboChart;
