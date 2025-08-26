import React, { useState, useEffect, useContext } from "react";
import API from "../../api/axiosInstance";
import { AuthContext } from "../../Context/AuthProvider";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get(`/api/recruiters/jobs/${user.email}`)
      .then((res) => setJobs(res.data))
      .catch(() => {});
  }, [user.email]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        padding: "2rem",
        color: "#fff",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h2 className="text-4xl  font-bold text-center mb-10">
        📋 My Posted Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-white text-lg mt-10">
          🚫 You haven’t posted any jobs yet.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <div
              key={j.id}
              className="bg-black m-5 text-white rounded-2xl shadow-lg p-6 border border-gray-700 flex flex-col items-center text-center hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-semibold mb-2">{j.title}</h3>
              <p className="text-blue-400 font-medium mb-3">{j.companyName}</p>
              <p className="text-gray-300 mb-4">{j.description}</p>

              <div className="text-sm space-y-1">
                <p><span className="font-semibold">Type:</span> {j.type}</p>
                <p><span className="font-semibold">Location:</span> {j.location}</p>
                <p><span className="font-semibold">Remote:</span> {j.remote ? "Yes" : "No"}</p>
                <p><span className="font-semibold">Stipend:</span> ₹{j.stipend}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
