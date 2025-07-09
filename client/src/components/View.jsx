import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import Lenis from 'lenis'

function View() {
    // Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
//   console.log(e);
});
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

    }, [])
    return (
        <div className='min-h-[110vh] w-full blogsbg relative top-0 left-0   pt-10 overflow-hidden'>
            <Link to="/blogs"><div className="back absolute top-5 left-5 text-2xl text-[#42307D]">Back</div>
            </Link>
            <div className="viewblog w-[60%] mb-10 min-h-[90vh] border-2 rounded-4xl border-black place-self-center flex flex-col gap-2 overflow-hidden p-10">
                <img src="/bg-night.jpg" className='w-full imgv rounded-4xl' alt="" />
                <h1 className='text-6xl'>Title</h1>
                <p className='text-xl mt-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum atque quisquam et, reiciendis omnis dolor, eaque minima illum quae veniam sunt! Eveniet culpa vitae sint aperiam excepturi qui nihil odio!
                    Expedita quam minima aut aperiam nemo, modi veniam sapiente voluptates soluta impedit dicta accusantium ab ratione ipsum? Molestiae minus provident quaerat consequuntur ipsum cum nemo quam aperiam. Doloribus, id recusandae!
                    Praesentium facilis architecto inventore dolore enim ducimus quisquam exercitationem fugit aliquid, alias maxime recusandae, atque commodi facere rem vitae ipsa similique doloremque accusamus eius tempora quas quo vel nemo. Laborum?
                    Sint labore laboriosam consequuntur magni adipisci. A animi maxime quasi consequatur architecto, soluta illo fugiat quisquam atque inventore non nam ad iusto culpa necessitatibus autem aliquam aperiam voluptate consequuntur? Quo.
                    Libero, necessitatibus obcaecati. Enim omnis quae quia minus? Labore blanditiis beatae maiores odio quos. Porro saepe iste harum quam at dolores dolor magnam, aliquam illum quas. Molestias minima asperiores alias</p>

            </div>

        </div>
    )
}

export default View