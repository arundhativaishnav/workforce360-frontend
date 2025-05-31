import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCalendar, FaCogs, FaMoneyBillAlt, FaTachometerAlt, FaUsers , FaBullhorn } from 'react-icons/fa';
import { UseAuth } from '../../context/authcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmpSidebar = () => {
  const { user } = UseAuth();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleCheckIn = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/attendance/checkin", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.data.success && isMounted.current) {
        toast.success("Checked in successfully!");
      }
    } catch (err) {
      if (isMounted.current) {
        toast.error(err.response?.data?.message || "Check-in failed");
      }
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await axios.put("http://localhost:5000/api/attendance/checkout", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.data.success && isMounted.current) {
        toast.success("Checked out successfully!");
      }
    } catch (err) {
      if (isMounted.current) {
        toast.error(err.response?.data?.message || "Check-out failed");
      }
    }
  };


  const linkClasses = ({ isActive }) =>
    `${isActive ? 'bg-blue-500' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-blue-400 transition`;

  return (
    <div className='bg-black text-white h-screen fixed left-0 top-0 w-64 flex flex-col'>
      {/* Header */}
      <div className='bg-blue-600 h-14 flex items-center justify-center'>
        <h3 className='text-2xl font-bold'>WorkForce360</h3>
      </div>

      {/* Nav Links */}
      <div className='px-4 py-2 space-y-2 flex-1'>
        <NavLink to="/EmployeeDashboard" end className={linkClasses}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to={`/EmployeeDashboard/profile/${user._id}`} className={linkClasses}>
          <FaUsers />
          <span>My Profile</span>
        </NavLink>
        <NavLink to={`/EmployeeDashboard/leaves/${user._id}`} className={linkClasses}>
          <FaCalendar />
          <span>Leaves</span>
        </NavLink>
        <NavLink to={`/EmployeeDashboard/salary/${user._id}`} className={linkClasses}>
          <FaMoneyBillAlt />
          <span>Salary</span>
        </NavLink>
        <NavLink to="/EmployeeDashboard/settings" className={linkClasses}>
          <FaCogs />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/EmployeeDashboard/notifications" className={linkClasses}>
          <FaBullhorn />
          <span>Notifications</span>
        </NavLink>

      </div>

      {/* Attendance Buttons at Bottom */}
      <div className="px-4 pb-4 space-y-2">
        <button
          onClick={handleCheckIn}
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white font-semibold"
        >
          Check In
        </button>
        <button
          onClick={handleCheckOut}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white font-semibold"
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default EmpSidebar;
