import React, { useState, useEffect, useContext } from "react";
import API from "../../api/axiosInstance";
import { AuthContext } from "../../Context/AuthProvider";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Load all jobs
    API.get("/jobs/all")
      .then(res => setJobs(res.data))
      .catch(err => console.error("Failed to load jobs", err));

    // Load applied job IDs
    API.get(`/api/applications/student/${user.email}`)
      .then(res => setAppliedJobs(res.data)) // Assume backend returns a list of job IDs
      .catch(err => console.error("Failed to fetch applied jobs", err));
  }, [user.email]);

  const handleApply = async (jobId) => {
    try {
      await API.post("/api/applications/apply", {
        studentEmail: user.email,
        JobId: jobId
      });
      alert(`Successfully applied to job ${jobId}`);
      setAppliedJobs(prev => [...prev, jobId]); // add to applied jobs list
    } catch (err) {
      console.error("Apply error", err);
      alert("Application failed. Try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Available Job Listings</h2>
      {jobs.map(job => (
        <div key={job.id} className="card mb-3 p-3">
          <h4>{job.title}</h4>
          <p><strong>Company:</strong> {job.companyName}</p>
          <p>{job.description}</p>
          <button
            className="btn btn-primary"
            onClick={() => handleApply(job.id)}
            disabled={appliedJobs.includes(job.id)}
          >
            {appliedJobs.includes(job.id) ? "Applied" : "Apply"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default BrowseJobs;
