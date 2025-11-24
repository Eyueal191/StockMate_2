// src/components/charts/DonutChart.jsx
import React, { useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const CustomLegend = ({ labels, values, colors, hiddenIndexes, toggleIndex }) => {
  // Total revenue **only counting visible slices**
  const totalVisibleRevenue = values.reduce(
    (sum, val, i) => sum + (hiddenIndexes[i] ? 0 : val),
    0
  );

  return (
    <div className="flex flex-col space-y-3 p-6 border border-gray-100 rounded-2xl bg-white shadow-lg w-full md:max-w-sm">
      <div className="text-center md:text-left mb-4 border-b pb-3 border-gray-100">
        <span className="text-xl lg:text-2xl font-extrabold text-gray-900">
          Total Revenue: {totalVisibleRevenue.toLocaleString()}{" "}
          <span className="text-red-600">Birr</span>
        </span>
      </div>
      <ul className="space-y-2">
        {labels.map((label, i) => {
          const value = values[i];
          const isHidden = hiddenIndexes[i];
          const percentage = totalVisibleRevenue
            ? ((value / totalVisibleRevenue) * 100).toFixed(2)
            : 0;

          return (
            <li
              key={label}
              className={`flex items-center cursor-pointer p-2 rounded-lg transition-all ${
                isHidden
                  ? "opacity-40 bg-gray-50"
                  : "text-gray-800 font-semibold hover:bg-indigo-50 hover:shadow-sm"
              }`}
              onClick={() => toggleIndex(i)}
            >
              <span
                className="inline-block w-5 h-5 rounded-md mr-3 border transition-transform"
                style={{
                  backgroundColor: isHidden ? "#f9fafb" : colors[i],
                  borderColor: isHidden ? "rgba(0,0,0,0.1)" : colors[i],
                  transform: isHidden ? "scale(0.95)" : "scale(1)",
                }}
              ></span>
              <span className={isHidden ? "line-through text-gray-400" : "text-gray-700"}>
                {label}: {value.toLocaleString()} <span className="text-red-600">Birr</span>
              </span>
              <span
                className={`ml-auto font-bold ${isHidden ? "text-gray-400" : "text-indigo-600"}`}
              >
                ({percentage}%)
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

function DonutChart({ labels = [], dataPoints = [], colors = [] }) {
  const [hiddenIndexes, setHiddenIndexes] = useState(Array(labels.length).fill(false));

  const chartColors = colors.length
    ? colors
    : [
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(255, 159, 64, 0.7)",
      ];

  const toggleIndex = (index) => {
    setHiddenIndexes((prev) => {
      const newHidden = [...prev];
      newHidden[index] = !newHidden[index];
      return newHidden;
    });
  };

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Revenue by Category",
          data: dataPoints.map((val, i) => (hiddenIndexes[i] ? 0 : val)),
          backgroundColor: chartColors,
          borderWidth: 3,
          borderColor: "#fff",
          hoverOffset: 20,
          spacing: 3,
        },
      ],
    }),
    [labels, dataPoints, chartColors, hiddenIndexes]
  );

  const totalVisibleRevenue = dataPoints.reduce(
    (sum, val, i) => sum + (hiddenIndexes[i] ? 0 : val),
    0
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "60%",
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Revenue Analytics",
          font: { size: 28, weight: "900" },
          color: "#1f2937",
          padding: { top: 15, bottom: 25 },
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (tooltipItem) => {
              const value = tooltipItem.raw;
              const percentage = totalVisibleRevenue
                ? ((value / totalVisibleRevenue) * 100).toFixed(2)
                : 0;
              return `${tooltipItem.label}: ${value.toLocaleString()} Birr (${percentage}%)`;
            },
          },
          bodyFont: { weight: "bold", size: 14 },
          padding: 10,
          backgroundColor: "rgba(30, 41, 59, 0.9)",
        },
        datalabels: {
          display: true,
          color: "#111",
          font: { weight: "bold", size: 14 },
          align: "end",
          anchor: "end",
          formatter: (value) => {
            if (!value) return "";
            const percentage = totalVisibleRevenue ? ((value / totalVisibleRevenue) * 100).toFixed(1) : 0;
            return `→ ${percentage}%`;
          },
        },
      },
    }),
    [totalVisibleRevenue]
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-3xl border border-gray-100 shadow-2xl">
      <div className="flex flex-col md:flex-row md:justify-center md:items-start space-y-10 md:space-y-0 md:space-x-12">
        <div className="relative w-full max-w-md mx-auto md:w-1/2">
          <div className="h-80 sm:h-96 lg:h-[30rem] xl:h-[34rem] mx-auto">
            <Doughnut data={chartData} options={options} />
          </div>
        </div>

        <div className="w-full md:w-auto mx-auto flex justify-center md:block pt-10 md:pt-16">
          <CustomLegend
            labels={labels}
            values={dataPoints}
            colors={chartColors}
            hiddenIndexes={hiddenIndexes}
            toggleIndex={toggleIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default DonutChart;
