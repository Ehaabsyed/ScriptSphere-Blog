import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Login() {
  gsap.registerPlugin(useGSAP)
  //gsap animations
  useGSAP(()=>{
    //scriptsphere
    gsap.from(heading.current,{
      y:-100,
      duration:1,
      opacity:0
    })
    gsap.from(text.current,{
      x:-300,
      duration:0.6,
      opacity:0,
      delay:1
    })
    gsap.from(form.current,{
      x:300,
      duration:0.6,
      delay:1,
      opacity:0,
    })
  })

  const navigate=useNavigate()
  //useform
   const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
    reset
  } = useForm();
  axios.defaults.withCredentials=true
 //function onsubmit
  async function onSubmit(data) {
    //timer of 2s
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // console.log(data);
    axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/login`,{data},{withCredentials:true})
    .then(response=>{
      // console.log(response);
      
      if(response.data.status){
         navigate("/blogs")
      }else if(!response.data.exist){
        toast.error("User not found")
      }else if(!response.data.status){
        toast("password is incoorect")
      }
    })
    .catch(err=>{
      console.log(err);   
    })
    
    
    reset()
  }
  const heading = useRef()
  const text = useRef()
  const form = useRef()

  return (
    <div className='max-h-screen flex justify-center items-center  w-full relative'>
      <video src="/smokebg.mp4" muted loop playsInline autoPlay className='img h-screen object-cover w-full absolute top-0 left-0' alt="" />
      <div ref={heading} className="logo text-3xl sm:text-6xl text-white font-semibold absolute top-10 left-[50%] -translate-x-[50%] ">ScriptSphere</div>
      <div className="md:ml-32  absolute left-0 top-40 h-[75vh] w-[90vw] flex gap-10 md:justify-start md:items-start justify-center items-start">
        <div ref={text} className="quote md:flex   border-white hidden flex-col gap-4 max-w-[50vw]">
          <h2 className='text-6xl font-bold text-white'>Welcome Back!</h2>
          <p className='text-2xl mt text-white font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elitipsum dolor sit amet consectetur adipisicing elit. Voluptates illum officiis iure dio.</p>
          </div>
        <div className="form ml-10 md:ml-0 md:w-[30vw] w-[80vw] flex justify-start items-center h-fit">
          <form ref={form} onSubmit={handleSubmit(onSubmit)} method='POST' className='flex w-full box-shadow flex-col gap-3 text-white h-full rounded-4xl border-2 border-white text-xl items-start p-8 justify-center'>
            <label htmlFor="username" className='md:text-2xl text-xl'>Username</label>
            <input type="text" placeholder='Username' className='md:py-2 py-1 px-3 w-full border-white border rounded-full'
            {...register("username", { required: true, minLength: { value: 3, message: "min 3 letters required" } })} />
            {errors.username && <p className='text-red-500 text-xs font-medium ml-3'>{errors.username.message}</p>}
            <label htmlFor="password" className='md:text-2xl text-xl'>Password</label>
            <input type="password" placeholder='Password' className='md:py-2 py-1 px-3 w-full border-white border rounded-full' 
            {...register("password", { required: true, minLength: { value: 3, message: "min 3 letters required" } })} />
            {errors.password && <p className='text-red-500 text-xs font-medium ml-3'>{errors.password.message}</p>}
            <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Logging In" : "Log in"} className='rounded-full py-1 md:py-2 px-3 border-none bg-blue-700 text-white p' />
            <p className='text-[18px] '>Dont have an account? <Link to="/signup" className='text-[#3c00ff] font-bold'>Sign Up</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login