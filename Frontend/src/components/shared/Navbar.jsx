import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex items-center max-w-full justify-between bg-gray-800 p-4 shadow'>
            <div className="">
                <h2 className='text-lg text-white font-bold'>Book Recommendation System</h2>
            </div>
            <div className="">
                <ul className="flex gap-8">
                    <li className="text-sm text-gray-400 hover:text-white cursor-pointer hover:underline "><Link to="/">Home</Link></li>
                    <li className="text-sm text-gray-400 hover:text-white cursor-pointer hover:underline "><Link to="/recommandation">Recommendation</Link></li>
                    <li className="text-sm text-gray-400 hover:text-white cursor-pointer hover:underline ">Contact</li>
                    <li className="text-sm text-gray-400 hover:text-white cursor-pointer hover:underline">About</li>
                </ul>
            </div>
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Search Book Title"
                    className="px-4 py-1  border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                />
                <button className='py-1 px-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700 flex gap-2 items-center'>
                    <IoIosSearch/>
                    <p className='text-sm '>Search</p>
                </button>
            </div>
        </div>
    )
}

export default Navbar