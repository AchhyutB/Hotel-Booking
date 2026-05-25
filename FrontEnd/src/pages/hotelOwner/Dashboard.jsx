import React, { useState } from "react";
import { assets, dashboardDummyData } from "../../assets/assets";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import { formatPrice } from "../../utils/FormatPrice";
import { formatDateNP } from "../../utils/FormatDate";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const { currency } = useAppContext();
  const [dashboardData, setDashboardData] = useState(dashboardDummyData);

  // Revenue chart data — group by month
  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18500 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 53800 },
    { month: "May", revenue: 32000 },
    { month: "Jun", revenue: 41000 },
  ];

  // Booking status pie chart data
  const statusData = [
    {
      name: "Confirmed",
      value: dashboardData.bookings.filter((b) => b.status === "confirmed")
        .length,
    },
    {
      name: "Pending",
      value: dashboardData.bookings.filter((b) => b.status === "pending")
        .length,
    },
    {
      name: "Cancelled",
      value: dashboardData.bookings.filter((b) => b.status === "cancelled")
        .length,
    },
  ];

  const PIE_COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  // Payment status data
  const paymentData = [
    {
      name: "Paid",
      value: dashboardData.bookings.filter((b) => b.isPaid).length,
    },
    {
      name: "Unpaid",
      value: dashboardData.bookings.filter((b) => !b.isPaid).length,
    },
  ];

  const PAYMENT_COLORS = ["#3b82f6", "#e5e7eb"];

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listing, track booking and analyze revenue-all in one place. Stay updated with real-time insights to ensure smooth operations"
      />

      {/* Stats Cards */}
      <div className="flex gap-4 my-8">
        {/* Total Booking */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalBookingIcon}
            alt="Booking-Icon"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            src={assets.totalRevenueIcon}
            alt="Revenue-Icon"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">
              {formatPrice(dashboardData.totalRevenue, currency)}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 max-w-5xl">

        {/* Revenue Line Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <p className="font-medium text-gray-800 mb-4">
            Revenue Overview
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `Rs ${v / 1000}k`}
              />
              <Tooltip
                formatter={(value) => [
                  formatPrice(value, currency),
                  "Revenue",
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status Pie Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="font-medium text-gray-800 mb-4">
            Booking Status
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 max-w-5xl">

        {/* Payment Pie Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="font-medium text-gray-800 mb-4">
            Payment Status
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {paymentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PAYMENT_COLORS[index % PAYMENT_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "12px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <p className="font-medium text-gray-800 mb-4">Quick Stats</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-blue-500 text-sm font-medium">
                Confirmed
              </p>
              <p className="text-2xl font-medium text-gray-800 mt-1">
                {
                  dashboardData.bookings.filter(
                    (b) => b.status === "confirmed"
                  ).length
                }
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <p className="text-amber-500 text-sm font-medium">
                Pending
              </p>
              <p className="text-2xl font-medium text-gray-800 mt-1">
                {
                  dashboardData.bookings.filter(
                    (b) => b.status === "pending"
                  ).length
                }
              </p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <p className="text-green-500 text-sm font-medium">Paid</p>
              <p className="text-2xl font-medium text-gray-800 mt-1">
                {dashboardData.bookings.filter((b) => b.isPaid).length}
              </p>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <p className="text-red-500 text-sm font-medium">Unpaid</p>
              <p className="text-2xl font-medium text-gray-800 mt-1">
                {dashboardData.bookings.filter((b) => !b.isPaid).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5 mt-8">
        Recent Bookings
      </h2>

      <div className="w-full max-w-5xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">
                User Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Room Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium max-md:hidden">
                Dates
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Total Amount
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Payment Status
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {dashboardData.bookings.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.user.username}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.room.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-md:hidden">
                  {formatDateNP(item.checkInDate)}
                  {" → "}
                  {formatDateNP(item.checkOutDate)}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  {formatPrice(item.totalPrice, currency)}
                </td>
                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <div className="flex justify-center">
                    <button
                      className={`py-1 px-3 text-sm rounded-full ${
                        item.isPaid
                          ? "bg-green-200 text-green-700"
                          : "bg-amber-200 text-yellow-600"
                      }`}
                    >
                      {item.isPaid ? "Completed" : "Pending"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;