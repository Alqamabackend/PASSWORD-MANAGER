import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ context se login

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔐 Send register request
      const res = await axios.post("http://localhost:5000/api/auth/register", form);

      const { token, email } = res.data; // server se response
      login(token, email);               // ✅ login context me set karo
      navigate("/");                     // 🔁 redirect to homepage (Manager)
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/2 mx-auto mt-10">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        autoComplete="new-password"
        onChange={handleChange}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
