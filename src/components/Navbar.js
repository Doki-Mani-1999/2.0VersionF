// src/Components/Navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="px-4 py-2 rounded hover:bg-white/20 hover:text-yellow-300 transition text-white font-medium"
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg px-8 py-4 flex justify-between items-center">
      {/* Branding */}
      <div className="text-3xl font-extrabold text-white tracking-wider">
        Job<span className="text-yellow-300">Portal</span>
      </div>

      {/* Navigation Links */}
      <div  className="flex items-center text-dark space-x-4">
        {user?.role === "STUDENT" && (
          <>
            <NavLink to="/student/jobs">Browse Jobs</NavLink>
            <NavLink to="/student/profile">Profile</NavLink>
            <NavLink to="/jobs/all">Search Jobs</NavLink>
            <NavLink to="/student/upload-resume">Upload Resume</NavLink>
          </>
        )}

        {user?.role === "RECRUITER" && (
          <>
            <NavLink to="/recruiter/post-job">Post Job</NavLink>
            <NavLink to="/recruiter/my-jobs">My Jobs</NavLink>
          </>
        )}

        {user?.role === "ADMIN" && (
          <>
            <NavLink to="/admin/users">Users</NavLink>
            <NavLink to="/admin/send-email">Send Email</NavLink>
          </>
        )}

        {/* Logout */}
        {user?.email && (
          <button
            onClick={handleLogout}
            className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition font-semibold"
          >
            Logout ({user.email})
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
