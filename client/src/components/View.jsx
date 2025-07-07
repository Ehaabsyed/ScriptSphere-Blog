import React from 'react'
import { Link } from 'react-router'
function View() {
    return (
        <div className='min-h-screen w-full blogsbg pt-10 relative'>
            <Link to="/blogs"><div className="back absolute top-5 left-5 text-2xl text-[#42307D]">Back</div>
            </Link>
            <div className="viewblog w-[60%] min-h-[90vh] border-2 rounded-4xl border-black place-self-center overflow-hidden p-10">
                <h1 className='text-6xl'>Title</h1>
                <p className='text-xl mt-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum atque quisquam et, reiciendis omnis dolor, eaque minima illum quae veniam sunt! Eveniet culpa vitae sint aperiam excepturi qui nihil odio!
                    Expedita quam minima aut aperiam nemo, modi veniam sapiente voluptates soluta impedit dicta accusantium ab ratione ipsum? Molestiae minus provident quaerat consequuntur ipsum cum nemo quam aperiam. Doloribus, id recusandae!
                    Praesentium facilis architecto inventore dolore enim ducimus quisquam exercitationem fugit aliquid, alias maxime recusandae, atque commodi facere rem vitae ipsa similique doloremque accusamus eius tempora quas quo vel nemo. Laborum?
                    Sint labore laboriosam consequuntur magni adipisci. A animi maxime quasi consequatur architecto, soluta illo fugiat quisquam atque inventore non nam ad iusto culpa necessitatibus autem aliquam aperiam voluptate consequuntur? Quo.
                    Libero, necessitatibus obcaecati. Enim omnis quae quia minus? Labore blanditiis beatae maiores odio quos. Porro saepe iste harum quam at dolores dolor magnam, aliquam illum quas. Molestias minima asperiores alias.</p>

            </div>

        </div>
    )
}

export default View