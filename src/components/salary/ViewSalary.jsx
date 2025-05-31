import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UseAuth } from '../../context/authcontext';

const ViewSalary = () => {
  
  const [salary, setSalary] = useState([]);
  const [filteredSalary, setFilteredSalary] = useState([]);
  const { id } = useParams();
  let isMounted = true;

  const fetchSalaries = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (response.data.success && isMounted) {
          setSalary(response.data.salary);
          setFilteredSalary(response.data.salary);
        }
      } catch (error) {
        if (isMounted && error.response && !error.response.data.success) {
          toast.error(error.response.data.message);
        }
      }
    };

  useEffect(() => {
    fetchSalaries();
    return () => {
      isMounted = false;
    }
  }, [id]);

  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredRecords = salary.filter((item) =>
      item.employeeId?.employeeId?.toLowerCase().includes(query)
    );
    setFilteredSalary(filteredRecords);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Salary History</h2>

      

      {filteredSalary.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3">Sr No.</th>
                <th className="px-4 py-3">Emp ID</th>
                <th className="px-4 py-3">Basic Salary</th>
                <th className="px-4 py-3">Allowance</th>
                <th className="px-4 py-3">Deduction</th>
                <th className="px-4 py-3">Total Salary</th>
                <th className="px-4 py-3">Pay Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredSalary.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.employeeId?.employeeId}</td>
                  <td className="px-4 py-2">₹{item.basicSalary}</td>
                  <td className="px-4 py-2">₹{item.allowances}</td>
                  <td className="px-4 py-2">₹{item.deductions}</td>
                  <td className="px-4 py-2 font-semibold text-green-700">₹{item.netSalary}</td>
                  <td>{new Date(item.paymentDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-4">No salary records found.</div>
      )}
    </div>
  );
};

export default ViewSalary;
