import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns, LeaveButtons } from '../../../utils/LeavesHelper';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UseAuth } from '../../context/authcontext';

const LeaveTable = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);
  const { user } = UseAuth();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leave', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        const info = response.data.leaves.map((leave, index) => ({
          SrNo: index + 1,
          employeeId: leave.employeeId,
          Name: leave.Name,
          leaveType: leave.leaveType,
          department: leave.department,
          days:
            Math.ceil(
              (new Date(leave.endDate) - new Date(leave.startDate)) /
                (1000 * 60 * 60 * 24)
            ) + 1,
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(info);
        setFilteredLeaves(info);
      }
    } catch (error) {
      console.error('Error fetching leaves:', error);
      toast.error('Failed to fetch leave records', {
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const value = e.target.value.toLowerCase();
    const data = leaves.filter(
      (leave) =>
        leave.employeeId.toLowerCase().includes(value) ||
        leave.Name.toLowerCase().includes(value)
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="p-6 bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800">Manage Leaves</h3>
          </div>

          {/* Search + Status Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <input
              type="search"
              placeholder="Search by Employee ID or Name"
              className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={filterByInput}
            />
            <div className="flex flex-wrap gap-2">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                onClick={() => filterByButton('Pending')}
              >
                Pending
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                onClick={() => filterByButton('Approved')}
              >
                Approved
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                onClick={() => filterByButton('Rejected')}
              >
                Rejected
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <DataTable
              columns={columns}
              data={filteredLeaves}
              pagination
              highlightOnHover
              responsive
              striped
              noDataComponent={
                <div className="p-4 text-center text-gray-500">
                  No leave records found.
                </div>
              }
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-gray-600 text-xl font-medium">
          Loading...
        </div>
      )}
    </>
  );
};

export default LeaveTable;
