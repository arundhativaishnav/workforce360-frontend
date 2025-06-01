import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const columns = [
    {
        name: 'Sr No',
        selector: (row) => row.srNo,
        width: '100px'
    },
    {
        name: 'Department Name',
        selector: (row) => row.departmentName,
        sortable: true,
    },
    {
        name: 'Action',
        cell: (row) => row.action,
        width: '200px'
    },
];

const DepartmentButtons = ({ dep_id, onDepartmentDelete, fetchDepartments }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this department?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(
                    `${import.meta.env.VITE_API_BASE_URL}/api/department/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                if (response?.data?.message) {
                    onDepartmentDelete(id);
                    toast.success(response.data.message, {
                        position: "top-right",
                    });
                    // Optional: refetch departments to ensure data consistency
                    // fetchDepartments();
                }
            } catch (error) {
                toast.error(
                    error.response?.data?.message || "Failed to delete department",
                    { position: "top-right" }
                );
            }
        }
    };

    return (
        <div className="flex justify-between items-center w-full max-w-[200px] mx-auto text-center">
            <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={() => navigate(`/AdminDashboard/edit-department/${dep_id}`)}
            >
                Edit
            </button>
            <button
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                onClick={() => handleDelete(dep_id)}
            >
                Delete
            </button>
        </div>
    );
};

export default DepartmentButtons;