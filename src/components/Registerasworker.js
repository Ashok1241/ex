import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Lr.css';

function Registerasworker() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [skills, setSkills] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!fname || !lname || !email || !password) {
      alert('Please fill in all fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    const pasRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    if (!pasRegex.test(password)) {
      alert('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      return false;
    }

    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:8000/register", { email, password, fname, lname, skills, contact});
      if (res.data === "exist") {
        alert("User already exists.");
        navigate('/Home')
      } else if (res.data === "notexist") {
        //localStorage.setItem('workerDetails', JSON.stringify({ email, fname, lname }));
        navigate("/Home");
        const savePassword = window.confirm("Do you want to save the password?");
        if (savePassword) {
          alert("Password saved successfully!");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="a">
      <div className="auth-form-container">
        <h1 className="reg">WORKER REGISTRATION</h1>
        <form className="register-form" method="POST">
          <label className="lgn">First Name</label>
          <input type="text" placeholder="Enter your first name" value={fname} onChange={(e) => setFname(e.target.value)} />
          <label className="lgn">Last Name</label>
          <input type="text" placeholder="Enter your last name" value={lname} onChange={(e) => setLname(e.target.value)} />
          <label className="lgn">Email</label>
          <input type="email" placeholder="Enter your e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="lgn" htmlFor="number">Contact</label>
          <input type="number" placeholder="Enter your contact number" value={contact} onChange={(e) => setContact(e.target.value)} />
          <label className="lgn" htmlFor="skills">Skills</label>
          <select value={skills} onChange={(e) => setSkills(e.target.value)}>
            <option value="">Select your skill</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Beauty and spa">Beauty and Spa</option>
            <option value="Tutor">Tutor</option>
            <option value="Electrician">Electrician</option>
            <option value="Plumber">Plumber</option>
          </select>
          <label className="lgn" htmlFor="password">Password</label>
          <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br></br>
          <button type="submit" onClick={submit}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Registerasworker;
