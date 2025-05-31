import { useNavigate } from "react-router-dom";

const columns = [
    {
        name : 'Sr No.',
        selector: row => row.SrNo,
        width:"100px",
    },
    {
        name : 'Emp ID',
        selector: row =>row.employeeId,
        width:"140px",
    },
    {
        name : 'Name',
        selector: row => row.Name,
        width:"160px",
    },
    {
       name : "Leave Type",
       selector: row => row.leaveType,
       width:"160px",
    },
    {
       name : "Department",
       selector: row => row.department,
       width:"160px",
    },
    {
        name : "Days",
        selector: row => row.days,
        width:"160px",
    },
    {
        name : "Status",
        selector: row => row.status,
        width:"160px",
    },
    {
        name : "Action",
        selector: row => row.action,
        width:"200px",
    },
    ];

const LeaveButtons = ({Id}) =>{
    const navigate = useNavigate();

    const handleView = (id) =>{
        navigate(`/AdminDashboard/leaves/${id}`)
    };
    return(
        <button
        className="px-4 py-1 bg-blue-500 rounded text-white hover-bg-blue-600"
        onClick={() =>handleView(Id)}
        >
            View Leave
        </button>
        );
};
export { columns , LeaveButtons };