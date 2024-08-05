import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Lr.css';

function Phonenum_login() {
    const navigate = useNavigate();
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const submitContactDetails = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/send-otp", {
                contactNumber, password
            });
            console.log(res.data);
            if (res.data === "otpSent") {
                setOtpSent(true);
            } else {
                alert("User not found or incorrect password");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to send OTP");
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/verify-otp", {
                contactNumber, otp
            });
            console.log(res.data);
            if (res.data === "verified") {
                navigate("/Home");
            } else {
                alert("Invalid OTP");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to verify OTP");
        }
    };

    return (
        <div className="a">
            <div className="auth-form-container">
                <h2 className="log">LOGIN</h2>
                {!otpSent ? (
                    <form className="login-form" onSubmit={submitContactDetails}>
                        <label className="lgn">Contact number</label>
                        <input 
                            value={contactNumber} 
                            onChange={(e) => setContactNumber(e.target.value)} 
                            type="number" 
                            placeholder="Enter your contact number" 
                            id="contact" 
                            name="contact" 
                        />
                        <label className="lgn">Password</label>
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            placeholder="Enter password" 
                            id="password" 
                            name="password" 
                        />
                        <br />
                        <button className="loginbtn" type="submit">Submit</button>
                    </form>
                ) : (
                    <form className="otp-form" onSubmit={verifyOtp}>
                        <label className="lgn">Enter OTP</label>
                        <input 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                            type="text" 
                            placeholder="Enter OTP" 
                            id="otp" 
                            name="otp" 
                        />
                        <br />
                        <button className="loginbtn" type="submit">Verify OTP</button>
                    </form>
                )}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default Phonenum_login;
