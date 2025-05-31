import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeButtons from '../../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import { columns } from '../../../utils/EmployeeHelper';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeList = () => {
  const [Employees, setEmployees] = useState([]);
  const [Emploading, setEmpLoading] = useState(true);
  const [filterEmployees, setFilterEmployees] = useState([]);

  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/employee`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        let SrNo = 1;

        const info = response.data.employee.map((employee) => {
          const profileImageSrc = employee?.userId?.profileImage || '/default-profile.png';

          return {
            _id: employee._id,
            srNo: SrNo++,
            dep_Name: employee.department?.departmentName || 'N/A',
            Name: employee.userId?.name || 'N/A',
            designation: employee.designation || 'N/A',
            profileImage: (
              <img
                src={profileImageSrc}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ),
            action: <EmployeeButtons Id={employee._id} onDeleteSuccess={fetchEmployees} />,
          };
        });

        setEmployees(info);
        setFilterEmployees(info);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to fetch employees');
    } finally {
      setEmpLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteremployees = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const records = Employees.filter((Employee) =>
      Employee.Name.toLowerCase().includes(searchTerm)
    );
    setFilterEmployees(records);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Employees</h3>
      </div>

      {/* Search + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search employee here"
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2"
          onChange={filteremployees}
        />
        <Link
          to="/AdminDashboard/add-Employee"
          className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors w-full sm:w-auto text-center"
        >
          Add New Employee
        </Link>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 overflow-x-auto">
        <DataTable
          columns={columns}
          data={filterEmployees}
          pagination
          responsive
          highlightOnHover
          progressPending={Emploading}
          noDataComponent={
            <div className="p-4 text-center text-gray-500">No employees found</div>
          }
        />
      </div>
    </div>
  );
};

export default EmployeeList;
