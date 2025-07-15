import React, { useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all';

function profileid() {
  gsap.registerPlugin(useGSAP)
  gsap.registerPlugin(ScrollTrigger)
  
  const profile = useRef()
  const gsapblogs = useRef()
  useGSAP(() => {
    gsap.from(profile.current, {
      x: -900,
      duration: 1,
      opacity: 0
    })
    gsap.from(gsapblogs.current, {
      x: 900,
      duration: 1,
      opacity: 0
    })

  })
  const username = useParams().id
  // console.log(username);
  const [user, setuser] = useState({})
  const [blogs, setblogs] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const authcheck = async () => {
      await axios.get("http://localhost:5000/auth/me", { withCredentials: true })
        .then(async (response) => {
          if (response.data.status) {
            console.log(response.data);

          } else {
            toast.error("You are not Logged In")
            navigate("/")
          }

        })

    }
    authcheck()
    //get user details and blogs
    axios.post("http://localhost:5000/auth/getuserdetail", { username }, { withCredential: true })
      .then(response => {
        setuser(response.data.user)
        setblogs(response.data.userBlogs);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

useEffect(() => {
  const cards = gsap.utils.toArray(".animate-card");

  cards.forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 100%",
        toggleActions: "play none none none",
        // markers: true, // optional: show for debug
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power3.out",
    });
  });

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, [blogs]);

  return (
    <div className='min-h-[90.3vh] w-full blogsbg flex gap-5 flex-col justify-center items-center'>
      <div ref={profile} className="profile border w-3/4 md:w-1/4 mt-8 h-90 border-black rounded-4xl p-8 overflow-hidden">
        <div className="dp w-full flex flex-col justify-center items-center h-60">
          <img src={`http://localhost:5000${user.image}`} className='w-50 rounded-full ' alt="" />
        </div>
        <div className="info flex flex-col justify-center items-center w-full">
          <h1 className='text-2xl font-bold'>{user.Name}</h1>
          <h2 className='text-xl font-medium'>{user.Username}</h2>
        </div>
      </div>

      <div ref={gsapblogs} className="posts w-2/3 h-full p-4 flex flex-col justify-start items-center">
        <h1 className='text-2xl font-medium underline mb-10'>{blogs.length} Posts</h1>


        {blogs.reverse().map(blog => {
          return (
            <div onClick={() => { navigate("/view/" + blog._id) }} key={blog._id}>
              <div className="blog animate-card w-[70vw] ml-20 md:ml-0 mr-20 h-[330px] md:h-[220px] overflow-hidden blog-shadow flex-col md:flex-row flex justify-center items-start md:justify-start md:items-start gap-5 rounded-3xl">
                <img src={blog.image} alt="" className='md:w-1/3 w-full h-2/3 md:h-full rounded-3xl' />
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
                  <div className="flex w-full justify-between items-center">
                    <h3 className='text-xl text-red-700 font-medium'>{blog.likes.length} Likes</h3>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

      </div>

    </div>
  )
}

export default profileid