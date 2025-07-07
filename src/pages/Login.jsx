import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate(); // ✅ for redirecting

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const { token, email } = res.data;

      login(token, email);   // ✅ Store in context/localStorage
      navigate("/");         // ✅ Redirect to manager page
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/2 mx-auto mt-20">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        autoComplete="new-password"
        onChange={handleChange}
        className="border p-2"
      />

      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;
