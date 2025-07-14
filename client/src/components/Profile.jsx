import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import Lenis from 'lenis'
import { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'

function Profile() {
  gsap.registerPlugin(useGSAP)
  const navigate = useNavigate()
  const deletelink = useRef()
  const profile = useRef()
  const gsapblogs = useRef()
  useGSAP(()=>{
    gsap.from(profile.current,{
      x:-900,
      duration:1,
      opacity:0
    })
    gsap.from(gsapblogs.current,{
      x:900,
      duration:1,
      opacity:0
    })
    
  })
  // Initialize Lenis
  const lenis = new Lenis({
    autoRaf: true,
  });

  // Listen for the scroll event and log the event data
  lenis.on('scroll', (e) => {
    // console.log(e);
  });
  const [User, setUser] = useState({})
  const [blogs, setblogs] = useState([])
  const [Username, setUsername] = useState('')

  // AUTH + Username fetch
  useEffect(() => {
    const authcheck = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/me", { withCredentials: true });

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

  // Fetch blogs wit username
  useEffect(() => {
    if (Username) {
      axios.post("http://localhost:5000/auth/getuserblogs", { username: Username }, { withCredentials: true })
        .then(response => {
          setblogs(response.data.blogs);
        })
        .catch(err => {
          console.error("Error fetching blogs:", err);
        });
    }
  }, [Username]);



  //delete post
  const handleDelete = async (e, id) => {
    e.stopPropagation()
    if (window.confirm("Are you sure you want to delete the blog?")) {
      axios.post("http://localhost:5000/auth/deleteblog", { id }, { withCredentials: true })
        .then(response => {
          if (response.data.status) {
            setblogs(prev => prev.filter(blog => blog._id !== id))
            toast.success("Blog deleted successfully")
          } else {
            toast.error("Error in deleting blog")
          }
        })
        .catch(err => {
          console.error("Error deleteing blog", err);
        });
    }
  }
  //server/public/profile-Images/profile-image-1752430569283-459761045.JPG

  return (
    <div className='min-h-[89.2vh] w-full blogsbg flex gap-5 flex-col justify-center items-center overflow-hidden'>
      <div ref={profile} className="profile box-shadow-profile mt-8 border w-3/4 md:w-1/4  h-100  rounded-4xl p-8 overflow-hidden">
        <div className="dp w-full flex flex-col justify-center items-center h-60">
          <img src={`http://localhost:5000${User.image}`} alt="Profile" className=' wh rounded-full' />
          <Link to={"/upload/" + User.email} className='text-xs mainclr'>Upload your profile picture</Link>
        </div>
        <div className="info flex flex-col justify-center items-center w-full">
          <h1 className='text-4xl font-bold'>{User.Name}</h1>
          <h2 className='text-xl font-normal text-[#3f2988]'>{User.Username}</h2>
          <h3 className='font-medium'>{blogs.length} posts</h3>
        </div>
      </div>

      <div ref={gsapblogs} className="posts w-2/3 h-full gap-4 p-4 flex flex-col justify-center items-center flex-wrap mr-20">

        {blogs.length < 1 && <p>no posts yet</p>}
        {blogs.reverse().map(blog => {
          return (

            <div onClick={() => { navigate("/view/" + blog._id) }} key={blog._id} className="blog w-[70vw] ml-5 md:ml-0 mr-20 h-[330px] md:h-[220px] overflow-hidden blog-shadow flex-col md:flex-row flex justify-center items-start md:justify-start md:items-start gap-5 rounded-3xl">
              <img src={blog.image} alt="No Image found" className='md:w-1/3 w-full h-2/3 md:h-full rounded-3xl' />
              <div className="flex flex-col md:gap-1 h-full md:mt-0 -mt-4">
                <p className='text-gray-800 md:text-[12px] md:mt-3'>{blog.category}</p>
                <h2 className='md:text-[18px] font-bold'>{blog.title}</h2>
                <p className='md:text-[17px] w-[600px] overflow-hidden tracking-tight leading-6.5 line-clamp-2 hidden md:block'>{blog.content}</p>
                <p className='md:text-[12px] text-gray-800'>
                  {new Date(blog.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <div className="flex md:flex-col w-full justify-between gap-2 md:gap-0 items-start ">
                  <h3 className='md:text-xl text-red-700 font-medium'>{blog.likes.length} Likes</h3>
                  <h3 onClick={(e) => handleDelete(e, blog._id)} className='md:text-[16px] px-2  bg-red-600 rounded-full w-fit text-white font-normal mr-8 cursor-pointer' >Delete</h3>

                </div>
              </div>
            </div>

          )
        })}


      </div>

    </div>
  )
}

export default Profile