import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UseAuth } from '../../context/authcontext';
import { useNavigate } from 'react-router-dom';

const AdminSettings = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const { name, email } = res.data.user;
        setFormData((prev) => ({
          ...prev,
          name: name || '',
          email: email || '',
        }));
      } catch (err) {
        console.error('Failed to fetch admin data', err);
        toast.error('Failed to load admin data');
      }
    };

    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = formData;

    if (newPassword && newPassword !== confirmPassword) {
      return toast.error('New password and confirm password do not match.');
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/info`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Admin profile updated successfully');
        navigate('/AdminDashboard'); // Adjust this route if needed
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update admin profile');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
        <InputField label="Current Password" name="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange} />
        <InputField label="New Password" name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} />
        <InputField label="Confirm New Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default AdminSettings;
