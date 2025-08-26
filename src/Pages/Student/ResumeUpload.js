import React, { useState } from 'react';
import axios from '../../api/axiosInstance';

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file); // ✅ must match backend param name

    try {
      const res = await axios.post('/api/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMsg('Resume uploaded successfully!');
    } catch (err) {
      setMsg('Upload failed.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Upload Resume</h3>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
