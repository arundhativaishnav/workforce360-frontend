import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchDepartments } from '../../../utils/EmployeeHelper';

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: '',
    phoneNumber: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    designation: '',
    department: '',
    salary: '',
    password: '',
    role: '',
    image: null,
    
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const employee = res.data.employee;

        setFormData({
          name: employee.userId?.name || '',
          email: employee.userId?.email || '',
          employeeId: employee.employeeId || '',
          phoneNumber: employee.userId?.phone || '',
          dob: employee.dob ? employee.dob.slice(0, 10) : '',
          gender: employee.gender || '',
          maritalStatus: employee.maritalStatus || '',
          designation: employee.designation || '',
          department: employee.department?._id || '',
          salary: employee.salary || '',
          password: '',
          role: employee.userId?.role || '',
          image: null,
        });
      } catch (err) {
        console.error('Error fetching employee:', err);
        toast.error('Failed to fetch employee data.');
      }
    };

    const getDepartments = async () => {
      const dept = await fetchDepartments();
      setDepartments(dept);
    };

    fetchEmployee();
    getDepartments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataObj.append(key, value);
      }
    });

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/employee/update/${id}`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        navigate('/AdminDashboard/employees');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Edit Employee</h2>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} />
          <InputField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />
          <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />

          <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['male', 'female', 'other']} />
          <SelectField label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} options={['single', 'married', 'divorced', 'widowed']} />
          <InputField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Department</label>
            <select name="department" value={formData.department} onChange={handleChange} required className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.departmentName}
                </option>
              ))}
            </select>
          </div>

          <InputField label="Salary" name="salary" type="number" value={formData.salary} onChange={handleChange} />
          <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
          <SelectField label="Role" name="role" value={formData.role} onChange={handleChange} options={['admin', 'Employee']} />
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">Upload New Profile Image</label>
            <input type="file" name="image" onChange={handleChange} accept="image/*" className="py-2" />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleSubmit}>
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable input field
const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div className="flex flex-col">
    <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

// Reusable select field
const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </option>
      ))}
    </select>
  </div>
);

export default EditEmployee;
