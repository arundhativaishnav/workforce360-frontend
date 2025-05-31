import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response?.data?.employee) {
          setEmployee(response.data.employee);
        } else {
          console.error("Unexpected response:", response.data);
        }
      } catch (error) {
        console.error('Error fetching employee:', error.response?.data || error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-medium">Loading...</div>;
  }

  if (!employee) {
    return <div className="flex justify-center items-center h-screen text-xl text-red-500">Employee not found.</div>;
  }

  const profileImageSrc = employee.userId.profileImage || '/default-profile.png';


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* ✅ Profile Image */}
          <img
            src={profileImageSrc}
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover border-4 border-gray-200 shadow-md"
          />

          {/* Basic Info */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">{employee.userId?.name}</h2>

            <p className="text-gray-500">{employee.userId?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {[
            { label: "Employee ID", value: employee.employeeId },
            { label: "Department", value: employee.department?.departmentName },
            { label: "Date of Birth", value: employee.dob?.split("T")[0] },
            { label: "Gender", value: employee.gender },
            { label: "Marital Status", value: employee.maritalStatus },
            { label: "Salary", value: `₹ ${employee.salary}` },
            { label: "Role", value: employee.designation },
            { label: "Joining Date", value: employee.createdAt?.split("T")[0] },
            
          ].map((item, idx) => (
            <div key={idx}>
              <p className="text-gray-600 font-semibold">{item.label}:</p>
              <p className="text-gray-800">{item.value || "N/A"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
