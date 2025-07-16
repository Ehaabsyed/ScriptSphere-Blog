import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router'
import Lenis from 'lenis'
import { useState } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
function View() {
  gsap.registerPlugin(useGSAP)
const image = useRef()
const main = useRef()
const title = useRef()
const dategsap = useRef()
  const content = useRef()
  useGSAP(() => {
    const tl=gsap.timeline()
    tl.from(main.current,{
        opacity:0,
        duration:0.1
    })
    tl.from(image.current,{
        x:-900,
        opacity:0,
        duration:0.3
    })
    tl.from(title.current,{
        x:900,
        opacity:0,
        duration:0.3
    })
    tl.from(content.current,{
        x:-900,
        opacity:0,
        duration:0.3
    })
    tl.from(dategsap.current,{
        x:900,
        opacity:0,
        duration:0.3
    })
    

  })
    // Initialize Lenis
    const lenis = new Lenis({
        autoRaf: true,
    });
    const { id } = useParams()
    const [blog, setblog] = useState({})

    // Listen for the scroll event and log the event data
    lenis.on('scroll', (e) => {
        //   console.log(e);
    });
    const navigate = useNavigate()
    useEffect(() => {
        const authcheck = async () => {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, { withCredentials: true })
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

        //get blog details

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/viewblog`, { id }, { withCredential: true })
            .then(response => {
                setblog(response.data.blog);
            })
            .catch(err => {
                console.log(err);

            })

    }, [])
    return (
        <div className='min-h-[110vh] w-full blogsbg relative top-0 left-0   pt-10 overflow-hidden'>
            <Link to="/blogs"><div className="back absolute top-2 left-2 md:top-3 md:left-3 text-2xl text-[#42307D]">Back</div>
            </Link>
            <div ref={main} className="viewblog w-[95%]  md:w-[60%] mb-10 min-h-[90vh] mt-10 border-2 rounded-4xl border-black place-self-center flex flex-col gap-2 overflow-hidden p-3 md:p-10">
                <img ref={image} src={blog.image} className='w-full imgv rounded-4xl' alt="No Image found" />
                <h1 ref={title} className='text-6xl'>{blog.title}</h1>
                <p ref={content} className='text-xl mt-3'>{blog.content}</p>
                <p ref={dategsap}>
                    {new Date(blog.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}
                </p>

            </div>

        </div>
    )
}

export default View