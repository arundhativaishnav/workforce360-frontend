import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const SendNotification = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [sendToAll, setSendToAll] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {
          const formatted = response.data.employee.map(emp => ({
            label: emp.userId?.name || 'Unnamed',
            value: emp.userId?._id
          }));
          setEmployees(formatted);
        
        } else {
          toast.error('Failed to fetch employees');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSend = async () => {
    if (!title || !message) {
      toast.warning('Please enter title and message');
      return;
    }

    const recipientIds = sendToAll
      ? 'all'
      : selectedOptions.map(option => option.value);

    try {
      const payload = {
        title,
        message,
        recipientIds
      };

      const res = await axios.post('http://localhost:5000/api/notifications', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.data.success) {
        
        setTitle('');
        setMessage('');
        setSelectedOptions([]);
        setSendToAll(false);
        toast.success('Notification sent successfully');
      
      } else {
        toast.error('Failed to send notification');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while sending notification');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Send Notification</h2>

      <input
        type="text"
        placeholder="Notification Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <textarea
        placeholder="Notification Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 rounded w-full h-32"
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={sendToAll}
          onChange={() => setSendToAll(!sendToAll)}
        />
        <label className="font-semibold">Send to all employees</label>
      </div>

      {!sendToAll && (
        <div>
          <label className="block font-semibold mb-1">Select Employees</label>
          <Select
            isMulti
            options={employees}
            value={selectedOptions}
            onChange={setSelectedOptions}
            className="w-full"
            classNamePrefix="select"
          />
        </div>
      )}

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Notification'}
      </button>
    </div>
  );
};

export default SendNotification;
