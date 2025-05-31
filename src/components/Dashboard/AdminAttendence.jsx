// AdminAttendance.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";

const AdminAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  const fetchAttendance = async () => {
  try {
    const endpoint = filterDate
      ? "http://localhost:5000/api/attendance/filter"
      : "http://localhost:5000/api/attendance/all";

    const res = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: filterDate
        ? { startDate: filterDate, endDate: filterDate }
        : {},
    });

    setAttendanceData(
      Array.isArray(res.data) ? res.data : res.data.data || []
    );
  } catch (error) {
    console.error("Error fetching attendance:", error);
    toast.error("Failed to fetch attendance records");
  }
};


  useEffect(() => {
    fetchAttendance();
  }, [filterDate]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Employee Attendance Records</h2>

      <div className="mb-6">
        <label className="mr-3 text-lg font-medium text-gray-700">Filter by Date:</label>
        <input
          type="date"
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left text-sm font-semibold">Employee</th>
              <th className="p-4 text-left text-sm font-semibold">Date</th>
              <th className="p-4 text-left text-sm font-semibold">Check-In</th>
              <th className="p-4 text-left text-sm font-semibold">Check-Out</th>
              <th className="p-4 text-left text-sm font-semibold">Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              attendanceData.map((record, index) => {
                const checkIn = record.checkInTime ? new Date(record.checkInTime) : null;
                const checkOut = record.checkOutTime ? new Date(record.checkOutTime) : null;

                const workingHours =
                  checkIn && checkOut
                    ? ((checkOut - checkIn) / (1000 * 60 * 60)).toFixed(2)
                    : "-";

                return (
                  <tr key={index} className="hover:bg-gray-100 transition-colors">
                    <td className="p-4 border-t border-gray-200">{record.employeeId?.name || "-"}</td>
                    <td className="p-4 border-t border-gray-200">{format(new Date(record.date), "yyyy-MM-dd")}</td>
                    <td className="p-4 border-t border-gray-200">{checkIn ? format(checkIn, "HH:mm:ss") : "-"}</td>
                    <td className="p-4 border-t border-gray-200">{checkOut ? format(checkOut, "HH:mm:ss") : "-"}</td>
                    <td className="p-4 border-t border-gray-200">{workingHours}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAttendance;
