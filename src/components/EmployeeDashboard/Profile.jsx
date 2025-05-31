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
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Fetched employee:', response.data);


        if (response?.data?.employeeId) {
          setEmployee(response.data.employeeId);
        } else {
          console.error('Failed to fetch employee:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const profileImageSrc = employee.userId.profileImage || '/default-profile.png';


  

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : employee ? (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
          <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-10">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
              Employee Details
            </h2>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={profileImageSrc}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-gray-200 shadow-md"
                />

              </div>

              {/* Employee Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                <div>
                  <p className="text-gray-600 font-semibold">Name:</p>
                  <p className="text-gray-800 font-medium">{employee.userId.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Employee ID:</p>
                  <p className="text-gray-800 font-medium">{employee.employeeId}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Date of Birth:</p>
                  <p className="text-gray-800 font-medium">{employee.dob?.split('T')[0]}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Gender:</p>
                  <p className="text-gray-800 font-medium">{employee.gender}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Designation:</p>
                  <p className="text-gray-800 font-medium">{employee.designation}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Department:</p>
                  <p className="text-gray-800 font-medium">{employee.department.departmentName}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Email:</p>
                  <p className="text-gray-800 font-medium">{employee.userId.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Marital Status:</p>
                  <p className="text-gray-800 font-medium">{employee.maritalStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Error loading employee data.</div>
      )}
    </>
  );
};

export default ViewEmployee;
