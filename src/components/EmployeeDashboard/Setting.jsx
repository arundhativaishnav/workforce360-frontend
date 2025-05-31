import React , { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UseAuth } from '../../context/authcontext';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  const {user} = UseAuth();
  const [formData, setFormData] = useState({
    name:'' ,
    userId : user._id,
    image: null,
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/settings', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const { name, email } = res.data.user;
        setFormData((prev) => ({
          ...prev,
          name : name || '',
          email: email || '',
        }));
      } catch (err) {
        toast.error('Failed to load user data');
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = formData;

    if (newPassword && newPassword !== confirmPassword) {
      return toast.error('New password and confirm password do not match.');
    }

    const formDataObj = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        formDataObj.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.put(
        'http://localhost:5000/api/settings/change-profile',
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
          if (response.data.success) {
        toast.success(response.data.message || 'Profile updated successfully');
        Navigate("/EmployeeDashboard");
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Your Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500"
          />
        </div>
        <InputField label="Name" name="name" type="text" value={formData.name} onChange={handleChange} />
        <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
        <InputField label="Current Password" name="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange} />
        <InputField label="New Password" name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} />
        <InputField label="Confirm New Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default Setting;
