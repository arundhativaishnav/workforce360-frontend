import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchDepartments } from '../../../utils/EmployeeHelper';



const AddEmployee = () => {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const [salary, setSalary] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState(null);
    
    
    

    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        }
        getDepartments();    
    }, []);

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        const formDataObj = new FormData();
        formDataObj.append('name', name);
        formDataObj.append('email', email);
        formDataObj.append('employeeId', employeeId);
        formDataObj.append('phoneNumber', phoneNumber);
        formDataObj.append('dob', dob);
        formDataObj.append('gender', gender);
        formDataObj.append('maritalStatus', maritalStatus);
        formDataObj.append('designation', designation);
        formDataObj.append('department', department);
        formDataObj.append('salary', salary);
        formDataObj.append('password', password);
        formDataObj.append('role', role);
        if (image) {
            formDataObj.append('image', image);
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/employee/add`,
                formDataObj,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            console.log(response.data);
    
            if (response?.data?.message) {
                toast.success(response.data.message, {
                    position: "top-right",  
                });
                console.log(response.data.message);
                navigate('/AdminDashboard/employees');
              }
              
        } catch (error) {
            if(error.response) {
                toast.error(error.response.data.message, {
                    position: "top-right",
                });
            }
        }
    }

    return (
        <div className='max-w-4xl mx-auto mt-6 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-8 text-center'>Add New Employee</h2>
            <form className='space-y-8' onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-x-8 gap-y-6'>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Name</label>
                        <input 
                            type='text' 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500' 
                            placeholder='Insert Name' 
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Email</label>
                        <input 
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500' 
                            placeholder='Email Address' 
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Employee ID</label>
                        <input 
                            type='text' 
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            required
                            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Employee ID' 
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Phone Number</label>
                        <input 
                            type='tel' 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Phone Number' 
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Date of Birth</label>
                        <input 
                            type='date'
                            value={dob}
                            onChange={(e) => setDob(e.target.value)} 
                            required
                            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Gender</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                        >
                            <option value=''>Select Gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>

                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Marital Status</label>
                        <select
                            value={maritalStatus}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                            required
                            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                        >
                            <option value=''>Select Marital Status</option>
                            <option value='single'>Single</option>
                            <option value='married'>Married</option>
                            <option value='divorced'>Divorced</option>
                            <option value='widowed'>Widowed</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Designation</label>
                        <input
                            type='text'
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Designation'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Department</label>
                        <select 
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                            required
                        >
                            <option value=''>Select Department</option>
                            {departments.map(departments => (
                                <option key={departments._id} value={departments._id}>
                                    {departments.departmentName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Salary</label>
                        <input
                            type='number'
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            required
                            min='0'
                            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Salary'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Password</label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                            placeholder='Enter Password'
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                        >
                            <option value=''>Select Role</option>
                            <option value='admin'>Admin</option>
                            <option value='Employee'>Employee</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-sm font-medium text-gray-700'>Upload Profile</label>
                        <input
                            type='file'
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                            accept='image/*'
                            className='py-2'
                        />
                    </div>
                </div>

                <div className='text-center'>
                    <button type='submit' className='px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;