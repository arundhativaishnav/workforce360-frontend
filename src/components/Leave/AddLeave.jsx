import React, { useState, useEffect } from 'react';
import { UseAuth } from '../../context/authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplyLeaveForm = () => {
  const {user} = UseAuth();
  const navigate = useNavigate();

  const [leaveData, setLeaveData] = useState({
    userId: user._id,
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  // Update userId once user is available
  useEffect(() => {
    if (user && user._id) {
      setLeaveData((prev) => ({
        ...prev,
        userId: user._id,
      }));
    }
  }, [user]);

  // Prevent rendering the form until userId is set
  if (!user || !user._id || !leaveData.userId) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/leave/add`, leaveData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response?.data?.message) {
        navigate(`/EmployeeDashboard/leaves/${user._id}`);
        toast.success(response.data.message);
        
      }
    } catch (error) {
      console.error(error.response?.data || error.message || error);
      alert('Something went wrong, please try again later.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Apply for Leave</h2>

      <form onSubmit={handleSubmit}>
        {/* Leave Type */}
        <div className="mb-4">
          <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">Leave Type</label>
          <select
            id="leaveType"
            name="leaveType"
            value={leaveData.leaveType}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Paid Leave">Paid Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
          </select>
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={leaveData.startDate}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={leaveData.endDate}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Reason */}
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
          <textarea
            id="reason"
            name="reason"
            value={leaveData.reason}
            onChange={handleChange}
            rows="4"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Provide a reason for your leave request"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Apply for Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyLeaveForm;
