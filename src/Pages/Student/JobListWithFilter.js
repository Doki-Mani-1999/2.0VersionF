import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosInstance';

export default function JobListWithFilter() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (filter.trim() === "") {
          const res = await axios.get("/jobs/all");
          setJobs(res.data);
        } else {
          const res = await axios.get(`/jobs/search/title/${filter}`);
          setJobs(res.data);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, [filter]);

  return (
    <div className="container mt-4">
      <h3>Job Search</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search job title..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {jobs.map((job, idx) => (
        <div key={idx} className="card mb-2 p-2">
          <h5>{job.title}</h5>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
}
