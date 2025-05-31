// components/admin/ReadStatusModal.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReadStatusModal = ({ notificationId, onClose }) => {
  const [readBy, setReadBy] = useState([]);

  useEffect(() => {
    axios.get(`/api/notification/${notificationId}/status`)
      .then(res => setReadBy(res.data.readBy));
  }, [notificationId]);

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2">Read By</h3>
      <ul className="list-disc pl-5">
        {readBy.map(user => (
          <li key={user._id}>{user.name} ({user.email})</li>
        ))}
      </ul>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
    </div>
  );
};

export default ReadStatusModal;
