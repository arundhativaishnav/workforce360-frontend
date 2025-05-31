import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

export const columns = [
    {
        name: 'Sr No',
        selector: (row) => row.srNo,
        width : '160px',
        
    },
    {
        name: 'Image',
        selector: (row) => row.profileImage,
        width: '160px',
        
    },
    {
        name: 'Name',
        selector: (row) => row.Name,
        width : '160px',
    
    },
    {
        name: 'Department',
        selector: (row) => row.dep_Name,
        sortable: true,
        width : '160px',
    },
    {
        name: 'Designation',
        selector: (row) => row.designation,
        sortable: true,
        width : '160px',
    },
    {
        name: 'Action',
        cell: (row) => row.action,
        width : '450px',
        
        
    },
];
  export const fetchDepartments = async () => {
    let departments 
    try {
        const response = await axios.get('http://localhost:5000/api/department/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.data.status === 'success') {
            departments = response.data.departments
            
        }    
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
    return departments
};

//employees for salary department 
 export const fetchEmployees = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.status === 'success') {
      return response.data.employees;
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
  return []; // ← return empty array on failure
};




const EmployeeButtons = ({ Id, onDeleteSuccess }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
            try {
                await axios.delete(`http://localhost:5000/api/employee/${Id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                toast.success("Employee deleted successfully");
                if (onDeleteSuccess) {
                    onDeleteSuccess();
                }
            } catch (error) {
                toast.error("Failed to delete employee");
            }
        }
    };

    return (
        <div className="flex justify-between items-center w-full max-w-[350px] mx-auto text-center space-x-2">
            <button
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => navigate(`/AdminDashboard/employees/${Id}`)}
            >
                View
            </button>
            <button
                className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={() => navigate(`/AdminDashboard/employees/edit/${Id}`)}
            >
                Edit
            </button>
            <button
                className="px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
                onClick={() => navigate(`salary/${Id}`)}
            >
                Salary
            </button>
            <button
                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={() => navigate(`leaves/${Id}`)}
            >
                Leave
            </button>
            <button
                className="px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
};

export default EmployeeButtons;
