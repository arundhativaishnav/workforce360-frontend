import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const LeaveDetail = () => {

    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchLeave = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/leave/detail/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);

                if (response?.data?.leave) {
                    setLeave(response.data.leave);
                } else {
                    console.error('Failed to fetch leave:', response.data.message);
                }

            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLeave();
    }, [id]);

    const changestatus = async (id, status) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/leave/${id}`,
      { status }, // <-- Send status in an object
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    console.log(response.data);

    if (response.data.success) {
      Navigate('/AdminDashboard/leaves');
    }

  } catch (error) {
    console.error("Error updating leave status:", error.message);
  }
};

        

    return (
       <>
  {leave ? (
    <div className="min-h-screen bg-gradient-to-br from-black-100 to-black-200 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-md">
        <h1 className="text-4xl font-extrabold text-center text-black mb-12 tracking-wide">
          Leave Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-black-800 text-lg">
          <div>
            <span className="font-semibold text-black-600 mb-2">👤 Name: </span>
            {leave.Name}
          </div>
          <div>
            <span className="font-semibold text-black-600 mb-2">🆔 Employee ID: </span>
            {leave.employeeId}
          </div>
          <div>
            <span className="font-semibold text-black-600 mb-2">📂 Leave Type: </span>
            {leave.leaveType}
          </div>
          <div>
            <span className="font-semibold text-black-600 mb-2">📝 Reason: </span>
            {leave.reason}
          </div>
          <div>
            <span className="font-semibold text-black-600 mb-2">🏢 Department: </span>
            {leave.department}
          </div>
          <div>
            <span className="font-semibold text-black-600 mb-2">📅 Start Date: </span>
            {new Date(leave.startDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold text-black-600 mb-2">📅 End Date: </span>
            {new Date(leave.endDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold text-black-600 mb-2">
              {leave.status === "Pending" ? "Action: " : "Status: "}
              </span>
              {leave.status === "Pending" ? (
                <div className='flex space x-3 mb-2'> 
                  <button className=' rounded px-2 py-0.5 bg-green-600 hover:bg-green-700 mr-8'
                  onClick={() => changestatus(leave._id, "Approved")}
                  >Approve</button>
                  <button className='rounded px-2 py-0.5 bg-red-600 hover:bg-red-700'
                  onClick={() => changestatus(leave._id, "Rejected")}
                  >Reject</button>

                </div>
                ): <p className='font-medium'>{leave.status}</p>
              }
            
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen text-xl font-medium text-black-600">
      Loading...
    </div>
  )}
</>



    );
};

export default LeaveDetail;