import axios from 'axios'
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const UserContext = createContext()
const AuthContext = ({children}) =>{
    const [user , setUser] = useState(null)
    const [error, setError] =useState(null)
    const [loading , setLoading ] = useState(true);



    useEffect(() => {
        const verifyUser = async () =>{
            
            try { 
                const token = localStorage.getItem('token')
                
                if(token){
                    const response = await axios.get(`http://localhost:5000/api/auth/verify`, {
                        headers :{
                            "Authorization" : `Bearer ${token}`
                        }
                    })
                    //console.log(response)
                    if(response.data.success){
                        setUser(response.data.User)
                    }   
                }else{
                  setUser(null);
                  setLoading(false);
                }
                
            } catch (error) {
                if(error.response && !error.response.data.success){
                    setUser(null)
                }else{
                    setError("server Error");
                }
            }finally{
                setLoading(false);
            }
        }
        verifyUser();
    } , [])

    const login =(User) =>{
        setUser(User)
    }
    const logout =()=>{
        setUser(null)
        localStorage.removeItem("token")
        toast.dismiss(); // Clear all toast notifications on logout
    }
    return (
        <UserContext.Provider value={{user,login,logout, loading}}>
            {children}
        </UserContext.Provider>
    )
}
export const UseAuth =()=> useContext(UserContext)
export default AuthContext
