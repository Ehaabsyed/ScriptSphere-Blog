import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { NavLink, Link, useNavigate } from 'react-router'
function Navbar() {
  const navigate=useNavigate()
  const handleLogout=async ()=>{
    axios.get("http://localhost:5000/auth/logout")
    .then(res=>{
      toast.success("logged Out Succesfully")
      navigate("/")
    })
    .catch(err=>{
      console.log(err);
    })
    
  }
  return (
    <div className='h-[70px] bg-transparent w-full border-b-3 border-[#42307D] py-2 px-8 text-[#42307D] flex items-center justify-around'>
      <div className="logo text-4xl font-semibold ">ScriptSphere</div>
      <div className="nav-links flex gap-7 font-medium text-[16px]">
        <NavLink to="/blogs" className="rounded-full py-2 px-3  flex items-center justify-center">blogs</NavLink>
        <NavLink to="/create" className="rounded-full py-2 px-3  flex items-center justify-center">Post</NavLink>
        <NavLink to="/logout" onClick={handleLogout} className="rounded-full py-2 px-3  flex items-center justify-center">Logout</NavLink>
        <NavLink to="/profile" className="rounded-full py-2 px-3  flex items-center justify-center gap-1">Profile
          <div to="/profile"> <img src="/default.jpg" className='h-5 rounded-full img' alt="" /></div>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar