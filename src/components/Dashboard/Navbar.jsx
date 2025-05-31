import React from 'react';
import { UseAuth } from '../../context/authcontext';

function Navbar() {
    const {user , logout } = UseAuth(); 
    return (
        <div className="flex items-center text-white justify-between h-14 items-center bg-blue-600 text-white p-4 px-6 ">
            <p>Welcome {user.name}</p>
            <button className=' px-4 py-1 bg-blue-700 hover:bg-blue-800'
            onClick={logout}
            >Logout</button>
        </div>
    );
}

export default Navbar;