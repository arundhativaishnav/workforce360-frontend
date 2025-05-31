import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const EditDepartment = () => {
    const {id} = useParams(); 
    const [department, setDepartment] = useState([]);
    const [depLoading, setDepLoading] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        const response = await axios.put(
          `http://localhost:5000/api/department/${id}`,
          department,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
  
        if(response.data.success) {
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
    }


useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                 

                if (response.data.status === 'success') {
                    setDepartment(response.data.department);
                    
                } else {
                    console.error('Failed to fetch department:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching department:', error);
            } finally {
                setDepLoading(false); // Set loading to false after fetching
            }   
        };
        fetchDepartment();
}, [id ]); // Fetch department data using the id


    return (
        <>{depLoading ? <div>Loading.....</div>
            :
            <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Edit Department
      </h3>
      <form onSubmit = {handleSubmit} >
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
          Edit Department
        </button>
      </form>
    </div>
        }</>
        
    );
};

export{ EditDepartment } 