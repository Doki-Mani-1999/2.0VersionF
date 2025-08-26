import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import SendEmail from './SendEmail';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/users').then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>All Registered Users</h3>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <hr />
      <SendEmail />
    </div>
  );
}
