import React from "react";
import axios from "axios";
import { useState } from "react";
import { setToken } from "../utils/auth"; // ✅ Import the auth functions

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/auth/login", { email, password });
            setToken(response.data.token); // ✅ Store the token
            alert("Login successful!");
        } catch (error) {
            alert("Login failed: " + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
