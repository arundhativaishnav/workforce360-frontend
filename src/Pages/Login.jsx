import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UseAuth } from '../context/authcontext';
import {useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {login} = UseAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/Login`, {
                email: email.trim(), // Trim spaces
                password: password.trim() // Trim spaces
            });
    
            //console.log(response.data); // Log the response for debugging
    
            if (response.data.success) {
                //console.log(response.data);
                const user = response.data.User;
                //console.log(user);
                //console.log(user.role);
                if (user) {
                    login(user);
                    localStorage.setItem("token", response.data.token);
                    if (user.role === "admin") {
                        navigate('/AdminDashboard');
                        toast.success("Successfully Logged In");
                    } else {
                        navigate('/EmployeeDashboard');
                    }

                    
                } else {
                    setError("User  data is missing.");
                }
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError("An error occurred. Please try again.");
        }
    }
    

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-600 to-gray-100 space-y-6">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="font-Pacific text-3xl text-white">Login</h1>
            <div className="border shadow p-6 w-80 bg-white">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className='text-red-500'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            className="w-full px-3 py-2 border"
                            placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input 
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border"
                            placeholder='***********' 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Forgot password?</a>
                    </div>
                    <div className="mb-4">
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>   
        </div>
    );
}

export default Login;
