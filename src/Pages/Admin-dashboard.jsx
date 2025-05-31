import React from 'react'
import { UseAuth } from '../context/authcontext.jsx'
import AdminSidebar from '../components/Dashboard/AdminSidebar'
import Navbar from '../components/Dashboard/Navbar'
import AdminSummary from '../components/Dashboard/AdminSummary.jsx'
import { Outlet } from 'react-router-dom'


const AdminDashboard = () =>{
    const {user} = UseAuth()
    
    return (
        <div className='flex'>
            <AdminSidebar/>
            <div className='flex-1 ml-64 bg-gray-100 h-screen'>
                <Navbar/>
                <Outlet/>
            </div>
        </div>
    )
}
export default AdminDashboard
