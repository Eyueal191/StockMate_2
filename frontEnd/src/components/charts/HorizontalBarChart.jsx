import { Bar } from "react-chartjs-2";
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

function HorizontalBarChart({ labels = [], values = [] }) {
  const colors = [
    "#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6",
    "#06B6D4", "#F43F5E", "#84CC16", "#D946EF", "#0EA5E9"
  ];

  const filtered = labels
    .map((label, i) => ({ label, value: values[i] }))
    .filter(item => typeof item.value === "number" && item.value > 0)
    .sort((a, b) => b.value - a.value);

  const sortedLabels = filtered.map(item => item.label);
  const sortedValues = filtered.map(item => item.value);

  const barHeight = 40; 
  const dynamicHeight = Math.max(sortedLabels.length * barHeight, 200);

  // Minimum width based on number of bars, each bar gets 50px horizontal space
  const minWidth = Math.max(sortedLabels.length * 50, 600);

  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Quantity Sold",
        data: sortedValues,
        backgroundColor: sortedValues.map((_, i) => colors[i % colors.length]),
        borderColor: sortedValues.map((_, i) => colors[i % colors.length]),
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 'flex',
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { right: 20 } },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(30, 41, 59, 0.9)",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        borderWidth: 1,
        borderColor: "#475569",
        padding: 10,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#000',
        font: (context) => {
          const barHeight = context.chart.getDatasetMeta(0).data[context.dataIndex].height;
          return { size: Math.max(12, Math.min(barHeight * 0.6, 16)), weight: 'bold' };
        },
        formatter: (value) => value,
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        display: true,
        grid: { color: "rgba(156,163,175,0.2)" },
        ticks: { color: "#374151", font: { size: 14 }, stepSize: 1 },
      },
      y: { 
        reverse: true,
        grid: { display: false },
        ticks: { 
          color: "#374151", 
          font: (context) => {
            const barHeight = context.chart.getDatasetMeta(0).data[context.dataIndex]?.height || 20;
            return { size: Math.max(12, Math.min(barHeight * 0.5, 16)), weight: 600 };
          }
        }
      },
    },
  };

  return (
    <div
      className="overflow-x-auto overflow-y-auto rounded-lg p-2"
      style={{ maxHeight: "80vh", maxWidth: "95vw" }}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-6"
        style={{ height: dynamicHeight, minWidth }}
      >
        <Bar data={data} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
}
export default HorizontalBarChart;
