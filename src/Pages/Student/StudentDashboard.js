import React, { useState, useEffect, useContext } from "react";
import API from "../../api/axiosInstance";
import { AuthContext } from "../../Context/AuthProvider";

const StudentProfile = () => {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: "",
    email: user?.email || "",
    course: "",
    university: "",
    resumeUrl: "",
    degree: "",
    yearOfStudy: 4,
  });

  useEffect(() => {
    if (user?.email) {
      API.get(`/student/profile/${user.email}`)
        .then((res) => setProfile(res.data))
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
        });
    }
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/student/profile", profile);
      alert("Profile saved");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Profile</h2>

      <input type="email" name="email" value={profile.email} readOnly />

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={profile.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="course"
        placeholder="Course"
        value={profile.course}
        onChange={handleChange}
      />

      <input
        type="text"
        name="university"
        placeholder="University"
        value={profile.university}
        onChange={handleChange}
      />

      <input
        type="url"
        name="resumeUrl"
        placeholder="Resume URL"
        value={profile.resumeUrl}
        onChange={handleChange}
      />

      <input
        type="text"
        name="degree"
        placeholder="Degree"
        value={profile.degree}
        onChange={handleChange}
      />

    <input
  type="number"
  name="yearOfStudy"
  placeholder="Year of Study"
  value={profile.yearOfStudy}
  onChange={(e) => {
    const value = e.target.value;
    setProfile((prev) => ({
      ...prev,
      yearOfStudy: value === "" ? 0 : parseInt(value, 10),
    }));
  }}
/>


      <button type="submit">Save</button>
    </form>
  );
};

export default StudentProfile;
