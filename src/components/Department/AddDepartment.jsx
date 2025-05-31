import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    departmentName: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/department/add`,
            department,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          if (response.data.success) {
            toast.success(response.data.message, {
                position: "top-right" 
            });
            navigate('/AdminDashboard/departments');
          }
        } catch (error) {
          if (error.response) {
            toast.error(error.response.data.message, {
              position: "top-right",
            });
          }
        }
      };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Add New Department
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="departmentName"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Department Name
          </label>
          <input
            type="text"
            name="departmentName"
            value={department.departmentName}
            onChange={handleChange}
            placeholder="Enter department name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            value={department.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
