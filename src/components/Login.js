import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Lr.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');
        if (isAuthenticated) {
            navigate('/Home');
        }
    }, [navigate]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/login", {
                email, password
            });
            console.log(res.data)
            if (res.data === "exist") {
                localStorage.setItem('username', email);
                localStorage.setItem('password', password);
                navigate('/Home');
            } else if (res.data === "notexist") {
                alert("User not found");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Wrong details");
        }
    };

    return (
        <div className="a">
            <div className="auth-form-container">
                <h2 className="log">LOGIN</h2>
                <form className="login-form" method="POST">
                    <label className="lgn">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your e-mail" id="email" name="email" />
                    <label className="lgn">Password</label>
                    <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter password" id="password" name="password" />
                    <br></br>
                    <button className="loginbtn" type="submit" onClick={submit}>Submit</button>
                </form>

                {error && <p className="error-message">{error}</p>}
                <br />
                <div align="center"><Link to='/Register'>Sign up</Link></div>
            </div>
        </div>
    );
}

export default Login;
