import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../../api/axiosInstance";

const initialJob = {
  title: "",
  description: "",
  type: "JOB",
  location: "",
  startDate: "",
  remote: false,
  durationWeeks: "",
  stipend: "",
  recEmail: "",
  postedById: "",
  skills: "",
  companyName: "",
  postedAt: ""
};

const PostJob = () => {
  const [job, setJob] = useState(initialJob);
  const [loading, setLoading] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const email = decoded?.sub;
      const userId = decoded?.userId;

      if (!email || !userId) {
        console.warn("⚠️ Missing fields in token");
        return;
      }

      setJob(prev => ({
        ...prev,
        recEmail: email,
        postedById: userId,
        postedAt: new Date().toISOString().split("T")[0]
      }));

      API.get(`/recruiters/${email}`)
        .then(res => {
          const recruiter = res.data;
          setJob(prev => ({
            ...prev,
            companyName: recruiter.companyName || "",
            location: recruiter.location || "",
            skills: recruiter.skills || ""
          }));
          setUserLoaded(true);
        })
        .catch(err => {
          console.error("❌ Failed to fetch recruiter:", err);
        });

    } catch (err) {
      console.error("❌ Token decode error:", err);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (["recEmail", "postedById", "postedAt"].includes(name)) return;

    setJob(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await API.post("/api/recruiters/job", job, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Job posted successfully!");
      setJob(prev => ({
        ...initialJob,
        recEmail: prev.recEmail,
        postedById: prev.postedById,
        postedAt: prev.postedAt
      }));
    } catch (err) {
      console.error(err);
      console.log("🔍 Job Data to Submit:", job);
      alert("❌ Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  if (!userLoaded) return <p className="text-center py-10">🔄 Loading recruiter data…</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 dark:bg-gray-800 dark:text-white">
        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-6">
          🚀 Post a New Job
        </h2>

        <form onSubmit={onSubmit} className="space-y-5 animate-fadeIn">

          {[
            { name: "title", type: "text", placeholder: "Job Title" },
            { name: "description", type: "textarea", placeholder: "Job Description" },
            { name: "type", type: "select", placeholder: "Job Type" },
            { name: "location", type: "text", placeholder: "Location" },
            { name: "startDate", type: "date", placeholder: "Start Date" },
            { name: "durationWeeks", type: "text", placeholder: "Duration (weeks)" },
            { name: "stipend", type: "text", placeholder: "Stipend" },
            { name: "skills", type: "text", placeholder: "Skills (comma separated)" },
            { name: "companyName", type: "text", placeholder: "Company Name" },
          ].map((field, idx) => (
            <div key={idx} className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white dark:bg-gray-700">
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  value={job[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-transparent focus:outline-none"
                  rows={4}
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  value={job[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-transparent focus:outline-none"
                >
                  <option value="JOB">Job</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={job[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-transparent focus:outline-none"
                />
              )}
            </div>
          ))}

          {/* Checkbox */}
          <div className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white dark:bg-gray-700">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remote"
                checked={job.remote}
                onChange={handleChange}
              />
              <span>Remote Available</span>
            </label>
          </div>

          {/* Read-only fields */}
          <div className="p-4 border border-gray-300 rounded-xl shadow-sm bg-gray-100 dark:bg-gray-600 space-y-2">
            <input name="recEmail" value={job.recEmail} readOnly className="w-full bg-transparent text-gray-500 dark:text-white" />
            <input name="postedById" value={job.postedById} readOnly className="w-full bg-transparent text-gray-500 dark:text-white" />
            <input name="postedAt" value={job.postedAt} readOnly className="w-full bg-transparent text-gray-500 dark:text-white" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 duration-200"
          >
            {loading ? "Posting..." : "📤 Post Job"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default PostJob;
