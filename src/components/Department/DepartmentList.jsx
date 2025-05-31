import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns } from '../../../utils/DepartmentHelpers';
import DepartmentButtons from '../../../utils/DepartmentHelpers';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/department/department', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.status === 'success') {
                let SrNo = 1;
                const info = response.data.departments.map((department) => ({
                    dep_id: department._id,
                    srNo: SrNo++,
                    departmentName: department.departmentName,
                    action: <DepartmentButtons 
                              dep_id={department._id} 
                              onDepartmentDelete={onDepartmentDelete} 
                              fetchDepartments={fetchDepartments}
                            />,
                }));
                setDepartments(info);
                setFilteredDepartments(info);
            }
        } catch (error) {
            console.error('Error fetching departments:', error);
            toast.error('Failed to fetch departments', {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    const onDepartmentDelete = (id) => {
        setDepartments(prevDepartments => 
            prevDepartments.filter(department => department.dep_id !== id)
        );
        setFilteredDepartments(prevDepartments => 
            prevDepartments.filter(department => department.dep_id !== id)
        );
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const records = departments.filter((department) =>
            department.departmentName.toLowerCase().includes(searchTerm)
        ); 
        setFilteredDepartments(records);
    };
    

    return (
        <div className='p-5'>
            <div className='text-center'>
                <h3 className='text-3xl font-bold'>Manage Departments</h3>
            </div>
            <div className='flex justify-between items-center my-2'>
                <input 
                    type="text" 
                    placeholder="Search department here" 
                    className='px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    onChange={filterDepartments}
                />
                <Link 
                    to="/AdminDashboard/add-department" 
                    className='px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors'
                >
                    Add New Department
                </Link>
            </div>
            <div className="p-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    
                    <DataTable
                    columns={columns}
                    data={filteredDepartments}
                    pagination
                    progressPending={loading}
                    noDataComponent={
                        <div className="p-4 text-center text-gray-500">No departments found</div>
                    }
                    highlightOnHover
                    />
                </div>
            </div>

        </div>
    );
};

export default DepartmentList;