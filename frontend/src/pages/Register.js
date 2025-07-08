import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "User"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registered successfully!");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="User">User</option>
        <option value="Owner">Store Owner</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
