import React, { useState } from 'react';
import axios from '../../api/axiosInstance';

export default function SendEmail() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [msg, setMsg] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/send-email', { to, subject, body });
      setMsg('Email sent!');
    } catch (err) {
      setMsg('Failed to send email.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Send Email</h3>
      <form onSubmit={handleSend}>
        <input className="form-control mb-2" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
        <input className="form-control mb-2" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <textarea className="form-control mb-2" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
        <button className="btn btn-success">Send</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
