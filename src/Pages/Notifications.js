import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    axios.get('/notifications')
      .then(res => setNotifications(res.data))
      .catch(err => console.error('Error fetching notifications', err));
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notifications.map((note) => (
          <div
            key={note.id}
            className={`alert ${note.read ? 'alert-secondary' : 'alert-info'} d-flex justify-content-between align-items-center`}
          >
            <span>{note.message}</span>
            {!note.read && (
              <button
                className="btn btn-sm btn-outline-dark"
                onClick={() => markAsRead(note.id)}
              >
                Mark as Read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
