'use client';
import { Calendar, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type AnalyticsData = {
  month: string;
  pageViews: number;
  clicks: number;
};

const allData: AnalyticsData[] = [
  { month: 'Jan', pageViews: 4000, clicks: 2400 },
  { month: 'Fev', pageViews: 3000, clicks: 1398 },
  { month: 'Mar', pageViews: 2000, clicks: 9800 },
  { month: 'Abr', pageViews: 2780, clicks: 3908 },
  { month: 'Mai', pageViews: 1890, clicks: 4800 },
  { month: 'Jun', pageViews: 2390, clicks: 3800 },
  { month: 'Jul', pageViews: 3490, clicks: 4300 },
  { month: 'Ago', pageViews: 4000, clicks: 2400 },
  { month: 'Set', pageViews: 3000, clicks: 1398 },
  { month: 'Out', pageViews: 2000, clicks: 9800 },
  { month: 'Nov', pageViews: 2780, clicks: 3908 },
  { month: 'Dez', pageViews: 1890, clicks: 4800 },
];

export const AnalyticsChart = () => {
  const [showAllMonths, setShowAllMonths] = useState(true);
  const [currentQuarter, setCurrentQuarter] = useState(0);

  // Dados a serem exibidos (todos ou por trimestre)
  const displayData = showAllMonths
    ? allData
    : allData.slice(currentQuarter * 3, currentQuarter * 3 + 3);

  const totalQuarters = Math.ceil(allData.length / 3);

  const handlePrevQuarter = () => {
    setCurrentQuarter((prev) => Math.max(0, prev - 1));
  };

  const handleNextQuarter = () => {
    setCurrentQuarter((prev) => Math.min(totalQuarters - 1, prev + 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Performance</h2>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAllMonths(!showAllMonths)}
            className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {showAllMonths ? 'Filtrar por trimestre' : 'Mostrar todos'}
            </span>
          </button>

          {!showAllMonths && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-md">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Q{currentQuarter + 1} {allData[currentQuarter * 3].month} -{' '}
                  {allData[Math.min(currentQuarter * 3 + 2, allData.length - 1)].month}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handlePrevQuarter}
                  disabled={currentQuarter === 0}
                  className={`p-1 rounded-md ${currentQuarter === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={handleNextQuarter}
                  disabled={currentQuarter === totalQuarters - 1}
                  className={`p-1 rounded-md ${currentQuarter === totalQuarters - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={displayData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" stroke="#DD6E42" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="pageViews"
              name="Page Views"
              fill="#DD6E42"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="clicks"
              name="Clicks"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {!showAllMonths && (
        <div className="mt-4 flex justify-center space-x-4">
          {Array.from({ length: totalQuarters }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuarter(index)}
              className={`px-3 py-1 text-sm rounded-md ${currentQuarter === index ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Q{index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
