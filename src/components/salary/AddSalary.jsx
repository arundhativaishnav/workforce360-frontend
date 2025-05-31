import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchDepartments, fetchEmployees } from '../../../utils/EmployeeHelper';

const AddSalary = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [salaryData, setSalaryData] = useState({
    employeeId: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    payDate: '',
  });

  useEffect(() => {
    const getDepartments = async () => {
      const dept = await fetchDepartments();
      setDepartments(dept);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const deptId = e.target.value;
    setSelectedDepartment(deptId);
    if (deptId) {
      const employees = await fetchEmployees(deptId);
      console.log('fetched employees:', employees);
      setEmployeeList(employees);
    } else {
      setEmployeeList([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalaryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/salary/add`,
        salaryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);

      toast.success(response.data.message);
      navigate('/AdminDashboard/employees');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add salary');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Add Salary</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Department */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">Department</label>
          <select
            value={selectedDepartment}
            onChange={handleDepartment}
            required
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.departmentName}
              </option>
            ))}
          </select>
        </div>

        {/* Employee */}
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium text-gray-700">Employee</label>
          <select
            name="employeeId"
            onChange={handleChange}
            value={salaryData.employeeId}
            required
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Employee</option>
            {employeeList.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.employeeId}
              </option>
            ))}
          </select>
        </div>

        {/* Basic Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            onChange={handleChange}
            value={salaryData.basicSalary}
            placeholder="Enter Basic Salary"
            className="block p-2 w-full text-sm text-gray-700 border"
            required
          />
        </div>

        {/* Allowances */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Allowances</label>
          <input
            type="number"
            name="allowances"
            onChange={handleChange}
            value={salaryData.allowances}
            placeholder="Enter Allowances"
            className="block p-2 w-full text-sm text-gray-700 border"
            required
          />
        </div>

        {/* Deductions */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Deductions</label>
          <input
            type="number"
            name="deductions"
            onChange={handleChange}
            value={salaryData.deductions}
            placeholder="Enter Deductions"
            className="block p-2 w-full text-sm text-gray-700 border"
            required
          />
        </div>

        {/* Pay Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Pay Date</label>
          <input
            type="date"
            name="payDate"
            onChange={handleChange}
            value={salaryData.payDate}
            className="block p-2 w-full text-sm text-gray-700 border"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Salary
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalary;
