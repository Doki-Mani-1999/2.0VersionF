import React, { useState, useContext } from "react";
import API from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", form);
      const token = response.data.token;
      console.log("token " + token);

      login(token);

      const decoded = JSON.parse(atob(token.split('.')[1]));
      console.log(decoded);
      const role = decoded.role.toUpperCase();

      if (role === "RECRUITER") navigate("/recruiter/my-jobs");
      else if (role === "STUDENT") navigate("/StudentProfile");
      else if (role === "ADMIN") navigate("/adminusers");
      else navigate("/");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const [Theme, SetTheme] = useState('border boder-2 bg-light');
  const [btn,setBtn] = useState('border border-2 text-black bg-dark');

  function HandleChange(e)
  {
    if(e.target.checked)
    {
      SetTheme('border border-2 bg-dark');
      setBtn('border border-2 bg-light text-white')

    }
    else{
      SetTheme('border border-2 bg-light');
      setBtn('border border-2 bg-light text-dark');
    }


  }
  return (
    <div className={Theme} container-fluid d-flex justify-content-center>
      <div className="form-switch">
        <input type="checkbox" onChange={HandleChange} /> <lable className="form-check-label">Dark Theme</lable>
      </div>
 
      
          <h2 className=" text-center">Login</h2>
         <form >
         
          <div className="mb-4">
            <label className="block mb-1">Email  :: </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              required
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1">Password  ::</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Password"
              required
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
         <div className={btn}>
          <button
            type="submit"
            className=" w-full bg-blue-600 hover:bg-blue-700 text-yellow py-2 rounded font-semibold transition"
          >
            Login
          </button>

          {/* 🚀 Go to Home Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full mt-3 bg-gray-500 hover:bg-gray-600 text-yellow py-2 rounded transition"
          >
            Go to Home
          </button>
          </div>
        </form>
        </div>)
    
};

export default Login;
