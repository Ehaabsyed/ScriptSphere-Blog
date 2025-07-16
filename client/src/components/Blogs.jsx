import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import toast from "react-hot-toast";
import Lenis from 'lenis'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";


function Blogs() {
  const blogs = useRef();
  const trendblogs = useRef()
  const trendtext = useRef()
  const firsttext = useRef()
  const secondtext = useRef()
  const searchref = useRef()
  gsap.registerPlugin(useGSAP)
  gsap.registerPlugin(ScrollTrigger)
  //gsap animation
  useGSAP(() => {
    //scriptsphere
    const tl = gsap.timeline()
    tl.from(firsttext.current, {
      x: -900,
      duration: 0.4,
      opacity: 0,
    })
    tl.from(secondtext.current, {
      x: 900,
      duration: 0.4,
      opacity: 0,
    })
    tl.from(searchref.current, {
      opacity: 0,
      x: -900
    })
    gsap.from(trendblogs.current, {
      x: 900,
      duration: 0.9,
      delay: 0.5,
      opacity: 0,
    })
    gsap.from(trendtext.current, {
      x: 900,
      duration: 0.9,
      delay: 0.5,
      opacity: 0,
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
  const [trendingblogs, settrendingblogs] = useState([])
  const [search, setsearch] = useState('')
  // handle likes

  const handleLike = async (e, id) => {
    e.stopPropagation();
    const username = User.Username;

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/bloglike`, { username, id }, { withCredentials: true });
      console.log(response.data.message);

      // Update blog likes locally
      setallBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog._id === id
            ? {
              ...blog,
              likes: blog.likes.includes(username)
                ? blog.likes.filter(u => u !== username) // unlike
                : [...blog.likes, username], // like
            }
            : blog
        )
      );
    } catch (err) {
      console.error("Error liking blog", err);
    }
  };


  const [User, setUser] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    const authcheck = async () => {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, { withCredentials: true })
        .then(async (response) => {

          if (response.data.status) {
            console.log(response.data);
            setUser(response.data.user)
          } else {
            toast.error("You are not Logged In")
            navigate("/")
          }

        })

    }
    authcheck()

  }, [])

  //get all blogs from DB
  const [allBlogs, setallBlogs] = useState([])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/getblogs`)
      .then(response => {


        setallBlogs(response.data.blogs);
      })
      .catch(err => {
        console.log(err);

      })


    axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/top-liked`)
      .then(response => {
        settrendingblogs(response.data.blogs);


      })
      .catch(err => {
        console.log(err);

      })

  }, [])
  const handleView = (e, id) => {
    navigate("/view/" + id)
    // console.log("viewing",id);
  }

  //check if user liked the blog
  function checkliked() {
    console.log("liking");

  }
  const filterblogs = allBlogs.filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase()))




  const reversedBlogs = [...filterblogs].reverse();
useEffect(() => {
  const cards = gsap.utils.toArray(".animate-card");

  cards.forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
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
}, [filterblogs]);

  return (
    <div className='min-h-[calc(100vh-70px)] blogsbg overflow-hidden'>
      <div className="input h-40 w-full  flex flex-col items-center justify-center gap-3">
        <h1 className='text-4xl text-[#42307D] font-bold text-center' ref={firsttext}>Resources And Insights</h1>
        <h4 className='text-2xl text-[#7665ac] font-normal text-center' ref={secondtext}>The lates industry news, interviews, technologies, and resources</h4>
        <div ref={searchref} className="input-search flex gap-1">
          <input type="text" placeholder='search' value={search} onChange={(e) => setsearch(e.target.value)} className='md:py-[18px] px-5 md:px-6 border-2 placeholder-black border-gray-600 rounded-full md:w-100 pl-[40px]' />
          <input type="submit" className='md:py-2 px-3  bg-[#42307D] text-white cursor-pointer rounded-full' value="search" />
          {/* <img src="/search.svg" className='absolute hidden lg:block top-[30.4%] left-[33%] text-gray-500 h-6' alt="" /> */}
        </div>
      </div>
      <div className="screen flex ">
        <div ref={blogs} className="blogs  w-full h-full flex flex-wrap gap-5 justify-start items-center ">
          <p className="absolute left-[50%] -translate-x-[50%] text-gray-700">{allBlogs.length < 1 && "No Blogs yet!"}</p>
          <p className="absolute left-[50%] -translate-x-[50%] text-gray-700">{filterblogs.length < 1 && "No Blogs found"}</p>
          {filterblogs.reverse().map((blog, index) => {
            return (
              <div onClick={(e) => handleView(e, blog._id)} key={blog._id} >
                <div className="blog animate-card ml-6 md:ml-0 w-[320px] h-[370px] blog-shadow flex flex-col justify-between rounded-3xl">
                  <img src={blog.image} alt="No Image found" className='blogimageheight w-full rounded-3xl' />
                  <p className='text-gray-600 text-[15px] line-clamp-2'>{blog.category}</p>
                  <h2 className='text-xl font-medium'>{blog.title}</h2>
                  <p className='text-[14px] overflow-hidden tracking-tight leading-5 line-clamp-2'>{blog.content}</p>
                  <div className="userinfo w-[300px] flex h-16 mt-1 gap justify-start items-center">
                    <Link to={"/profile/" + blog.username} onClick={(e) => e.stopPropagation()} className="w-1/6">
                      <img src={`${import.meta.env.VITE_BACKEND_URL}${blog.authorImage}`} className='h-10 bg-black w-10 rounded-full img' alt="not found" /></Link>
                    <div className="info">
                      <Link to="/profile/id" onClick={(e) => { e.stopPropagation() }}>
                        <h5 className='text-[18px]'>{blog.username}</h5></Link>
                      <p className='text-[14px] text-gray-700'>
                        {new Date(blog.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="likes ml-31 flex justify-center items-center gap-1">
                      <h4>{blog.likes.length}</h4>
                      <div onClick={(e) => handleLike(e, blog._id)}><FaHeart className='text-2xl cursor-pointer' fill={blog.likes.includes(User.Username) ? "red" : "white"} /></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
        <h2 ref={trendtext} className="text-2xl hidden lg:block absolute top-[30%] right-8 font-medium mr-10 text-[#42307D] mb-3">Trending Blogs</h2>

        <div ref={trendblogs} className="hidden lg:flex mb-6 rounded-xl flex-col justify-start p-4 py-0 items-center w20 max-h-[58vh] mr">
          <div className="trending rounded-xl scrollbar-hide gap-5 p-2 max-h-[64vh] overflow-scroll  overflow-x-hidden pt-3 cursor-pointer flex flex-wrap">

            {trendingblogs.map((blog, index) => {
              return (
                <div onClick={() => navigate("/view/" + blog._id)} key={blog._id} className="boc h-22 blog-shadow rounded-xl p-1 w-full flex">
                  <img src={blog.image} className="w-1/2 img rounded-xl h-full" alt="" />
                  <div className="info flex  flex-col h-full justify-between items-start p-2">
                    <h1 className="leading-4 tracking-tighter font-medium text-[17px]">{blog.title}</h1>
                    <h3 className="text-[12px] font-normal text-gray-700">{blog.category}</h3>
                  </div>
                </div>
              )

            })}




          </div>
          <h1 className="font-medium text-xl text-[#2a1769] tracking-tighter leading-5">Keep Writing - the world is waiting for your words.</h1>
        </div>
      </div>

      {/* //when all blogs is less than 1 than add bottom-0 */}
      <footer className={allBlogs.length < 1 ? "h-16 w-full gap-1 absolute bottom-0 flex-col bg-[#8378a7] border-t-4 border-[#42307D] flex justify-center p-2 items-center text-[18px] text-[#311c77]" : "h-16 p-2 w-full absolute bg-[#8378a7] border-t-4 border-[#42307D] flex flex-col justify-center items-center text-[18px] text-[#311c77]"}>
        <h3>Ehaabsyed-2025 || ScriptSphere</h3>
        <p className="flex text-center ml-8 gap-1"><a target="_blank" href="http://www.linkedin.com/in/syed-ehaab-8b8a49308"><FaLinkedin /></a> <a target="_blank" href="https://github.com/Ehaabsyed"><FaGithub /></a></p>
      </footer>
    </div>
    // h-14 w-full absolute bg-[#8378a7] border-t-4 border-[#42307D] flex justify-center items-center text-[18px] text-[#311c77]
  )
}

export default Blogs