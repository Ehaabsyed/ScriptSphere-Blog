import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';

function Upload() {
    const navigate = useNavigate()
    const [User, setUser] = useState({})

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    // AUTH + Username fetch
    useEffect(() => {
        const authcheck = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}auth/me`, { withCredentials: true });

                if (response.data.status) {
                    console.log(response.data)
                    setUser(response.data.user);
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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setSelectedFile(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };
    const email = User.Email

    const handleUpload = async () => {
        if (!selectedFile) return toast.error("Please select a file");

        const formData = new FormData();
        formData.append('profile-image', selectedFile);
        formData.append('email', email);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/upload-profile`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Profile picture uploaded!");
            console.log(res.data);
            navigate("/profile")
        } catch (err) {
            console.error(err);
            toast.error("Upload failed!");
        }
    };
    return (
        
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] px-4">
            <Link className='text-2xl absolute top-5 left-8 mainclr' to="/profile">Back</Link>
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-[#3f2988]">Upload Profile Picture</h1>

                <div className="w-full mb-4">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-40 h-40 rounded-full mx-auto object-cover mb-4 border-4 border-[#3f2988]" />
                    ) : (
                        <div className="w-40 h-40 rounded-full mx-auto bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
                            No Image
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e => handleFileChange(e))}
                        className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#3f2988] file:text-white
              hover:file:bg-[#32206d]
              cursor-pointer"
                    />
                </div>

                <button
                    onClick={handleUpload}
                    className="bg-[#3f2988] btnclr text-black hover:bg-[#32206d] w-full py-2 rounded-xl font-semibold transition duration-200"
                >
                    Upload
                </button>
            </div>
        </div>
    );
}

export default Upload;
