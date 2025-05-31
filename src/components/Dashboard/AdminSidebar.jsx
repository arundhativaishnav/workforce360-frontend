import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendar, FaCogs, FaMoneyBillAlt, FaTachometerAlt, FaUsers ,FaBullhorn } from 'react-icons/fa';

const AdminSidebar = () => {
    const linkClasses = ({ isActive }) =>
        `${isActive ? 'bg-blue-500' : ''} flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-blue-400 transition  `;

    return (
        <div className='bg-black text-white h-screen fixed left-0 top-0 w-64 space-y-2'>
            <div className='bg-blue-600 h-14 flex items-center justify-center'>
                <h3 className='text-2xl font-bold'>WorkForce360</h3>
                {/* Replace with font-Pacific if you've defined it in tailwind.config.js */}
            </div>
            <div className='px-4 py-2 space-y-2'>
                <NavLink to="/AdminDashboard" end className={linkClasses}>
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/AdminDashboard/employees" className={linkClasses}>
                    <FaUsers />
                    <span>Employees</span>
                </NavLink>
                <NavLink to="/AdminDashboard/departments" className={linkClasses}>
                    <FaBuilding />
                    <span>Departments</span>
                </NavLink>
                <NavLink to="/AdminDashboard/leaves" className={linkClasses}>
                    <FaCalendar />
                    <span>Leaves</span>
                </NavLink>
                <NavLink to="/AdminDashboard/salary/add" className={linkClasses}>
                    <FaMoneyBillAlt />
                    <span>Salary</span>
                </NavLink>
                <NavLink to="/AdminDashboard/settings" className={linkClasses}>
                    <FaCogs />
                    <span>Settings</span>
                </NavLink>
                <NavLink to="/AdminDashboard/attendance" className={linkClasses}>
                <FaCalendar />
                <span>Attendance</span>
                </NavLink>
                <NavLink to="/AdminDashboard/notifications" className={linkClasses}>
                <FaBullhorn />
                <span>Send Notification</span>
                </NavLink>

                
            </div>
        </div>
    );
};

export default AdminSidebar;
