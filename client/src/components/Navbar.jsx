import axios from 'axios'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import { NavLink, Link, useNavigate } from 'react-router'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
function Navbar() {
  const heading = useRef()
  const leftlinks = useRef()
  const leftlinks1 = useRef()
  const rightlinks = useRef()
  const rightlinks1 = useRef()

  gsap.registerPlugin(useGSAP)
  // gsap animation
  useGSAP(() => {
    gsap.from(heading.current, {
      y:-200,
      duration:0.5,
      opacity:0

    })
    gsap.from(leftlinks.current,{
      duration:2,
      opacity:0,
      delay:0.3
    })
    gsap.from(leftlinks1.current,{
      duration:2,
      opacity:0,
      delay:0.3
    })
    gsap.from(rightlinks.current,{
      duration:2,
      opacity:0,
      delay:0.3
    })
    gsap.from(rightlinks1.current,{
      duration:2,
      opacity:0,
      delay:0.3
    })
  })
  const navigate = useNavigate()
  const handleLogout = async () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`,{withCredentials:true})
      .then(res => {
        toast.success("logged Out Succesfully")
        navigate("/")
      })
      .catch(err => {
        console.log(err);
      })


    // AUTH + Username fetch
    useEffect(() => {
      const authcheck = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, { withCredentials: true });

          if (response.data.status) {
            console.log(response.data)
            setUser(response.data.user);
            setUsername(response.data.user.Username); // triggers second useEffect
          } else {
            toast.error("You are not Logged In");
            navigate("/");
          }
        } catch (error) {
          console.error(error);
          toast.error("Auth failed");
        }
      };

      authcheck();
    }, []);


  }
  return (
    <div className='h-[70px] bg-transparent w-full border-b-3 mb-3 border-[#42307D] py-2 px-8 text-[#42307D] flex-col md:flex items-center justify-center md:justify-around'>
      <div className="logo md:text-4xl font-semibold text-center" ref={heading}>ScriptSphere</div>
      <div className="nav-links flex items-center justify-center mt-2 gap-3 md:gap-7 font-medium text-[16px] ">
        <NavLink ref={leftlinks} to="/blogs" className="rounded-full md:py-2 md:px-3  flex items-center justify-center">blogs</NavLink>
        <NavLink ref={leftlinks1} to="/create" className="rounded-full md:py-2 md:px-3  flex items-center justify-center">Post</NavLink>
        <NavLink ref={rightlinks} to="/logout" onClick={handleLogout} className="rounded-full md:py-2 md:px-3  flex items-center justify-center">Logout</NavLink>
        <NavLink ref={rightlinks1} to="/profile" className="rounded-full md:py-2 md:px-3  flex items-center justify-center gap-1">Profile
          <div to="/profile"> <img src="/default.jpg" className='h-5 rounded-full img' alt="" /></div>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar