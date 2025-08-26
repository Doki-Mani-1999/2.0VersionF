import React, { useState } from "react";
import API from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "", role: "" });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("Registered!");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div
      style={{ height: "120vh" }}className={`min-h-screen flex flex-col  ${
        darkMode ? "bg-dark  text-white" : "bg-white text-dark"
      } transition-colors duration-300`}
    >
      {/* 🔘 Dark Mode Toggle Bar */}
      <div className="text-centerflex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-1 border rounded-md text-sm ${
            darkMode
              ? "border-white text-black hover:bg-gray"
              : "border-black text-white hover:bg-gray"
          } transition`}
        >
           {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* 🧾 Register Form */}
      <div style={{height:"100vh"}} className="text-center p-4  flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className={`w-full h-full max-w-md p-8 rounded-xl shadow-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          } transition`}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

          {/* Email Field */}
          <div className="mb-4 ">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 ">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* Role Dropdown */}
          <div className="mb-6">
            <label className="block mb-1">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Select role</option>
              <option value="STUDENT">Student</option>
              <option value="RECRUITER">Recruiter</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-dark py-2 rounded font-semibold transition"
          >
            Register
          </button>

          {/* Home Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full mt-3 bg-gray-500 hover:bg-gray-600 text-dark py-2 rounded transition"
          >
            Go to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
