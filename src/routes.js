import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import StudentProfile from "./Pages/Student/StudentDashboard";
import BrowseJobs from "./Pages/Student/BrowseJobs";

import PostJob from "./Pages/recruiter/PostJob";
import MyJobs from "./Pages/recruiter/MyJobs";
import AdminUsers from "./Pages/Admin/AdminUsers";
import SendEmail from "./Pages/Admin/SendEmail";
import ProtectedRoute from "./components/ProtectedRoute";
import JobListWithFilter from "./Pages/Student/JobListWithFilter";
import Notifications from "./Pages/Notifications";
import ResumeUpload from "./Pages/Student/ResumeUpload";
import Home from "./Pages/Auth/Home";


const AppRoutes = () => (
  <BrowserRouter>
    <Navbar />

    <Routes>
      
      <Route path="" element={<Home /> } />
      <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />

      {/* STUDENT ROUTES */}
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/jobs"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <BrowseJobs />
          </ProtectedRoute>
        }
      />

      
      <Route
        path="/student/upload-resume"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <ResumeUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs/all"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <JobListWithFilter />
          </ProtectedRoute>
        }
      />

      {/* RECRUITER ROUTES */}
      <Route
        path="/recruiter/post-job"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <PostJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/my-jobs"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <MyJobs />
          </ProtectedRoute>
        }
      />

      {/* ADMIN ROUTES */}
      <Route
  path="/AdminUsers"
  element={
    <ProtectedRoute allowedRoles={["Admin"]}>
      <AdminUsers />
    </ProtectedRoute>
  }
/>

      <Route
        path="/admin/send-email"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <SendEmail />
          </ProtectedRoute>
        }
      />

      {/* SHARED ROUTES */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STUDENT", "RECRUITER"]}>
            <Notifications />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
