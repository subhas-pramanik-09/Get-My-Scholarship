import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import Modal from './Modal';
import { FaUserCircle } from "react-icons/fa";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('login');
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to handle profile dropdown
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          credentials: "include", // Include cookies for session handling
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn]);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleProfileClick = () => {
    setIsProfileOpen((prev) => !prev); // Toggle the profile dropdown
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    setIsProfileOpen(false); // Close the profile when logging out
  };

  return (
    <nav className="sticky top-0 z-50 bg-emerald-50 border-b border-emerald-200 shadow-sm px-6 py-1 h-16 flex justify-between items-center">
      <div className="text-white text-lg font-bold">
       <img className='h-20 w-auto object-contain' src={Logo} alt="" />
      </div>
      <ul className="flex space-x-20">
        <li><Link to="/" className="text-slate-800 font-medium text-xl  hover:font-semibold hover:text-blue-700 hover:bg-emerald-300 px-2 rounded-lg py-1">Home</Link></li>
        <li><Link to="/scholarships" className="text-slate-800 font-medium text-xl  hover:font-semibold hover:text-blue-700 hover:bg-emerald-300 px-2 rounded-lg py-1">Scholarships</Link></li>
        <li><Link to="/blogs" className="text-slate-800 font-medium text-xl  hover:font-semibold hover:text-blue-700 hover:bg-emerald-300 px-2 rounded-lg py-1">Updatess</Link></li>
        {isLoggedIn ?      <li><Link to="/myblogs" className="text-slate-800 font-medium text-xl  hover:font-semibold hover:text-blue-700 hover:bg-emerald-300 px-2 rounded-lg py-1">My Updates</Link></li>:""}
   
        <li><Link to="/about" className="text-slate-800 font-medium text-xl  hover:font-semibold hover:text-blue-700 hover:bg-emerald-300 px-2 rounded-lg py-1">About Us</Link></li>
      </ul>
      <div className="flex items-center space-x-2">
        {isLoggedIn ? (
          <div className="relative">
            <FaUserCircle
              className="text-black text-4xl cursor-pointer"
              onClick={handleProfileClick} // Toggle profile dropdown instead of modal
            />
            {isProfileOpen && userInfo && (
              <div className="absolute top-12 right-0 w-80 bg-white shadow-2xl rounded-2xl p-5 border border-emerald-200 z-50">
                <h2 className="text-xl font-bold text-emerald-600 mb-4">👤 User Dashboard</h2>
                <div className="space-y-2 text-slate-800 text-base">
                  <p><span className="font-semibold">Name:</span> {userInfo.name}</p>
                  <p><span className="font-semibold">Email:</span> {userInfo.email}</p>
                  <p><span className="font-semibold">State:</span> {userInfo.state || 'N/A'}</p>
                  <p><span className="font-semibold">Category:</span> {userInfo.category || 'N/A'}</p>
                  <p><span className="font-semibold">Qualification:</span> {userInfo.qualification || 'N/A'}</p>
                  <p><span className="font-semibold">Income:</span> ₹{userInfo.income || 'N/A'}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className="w-[48%] bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
                    onClick={() => openModal('editProfile')} // Open edit profile modal
                  >
                    Edit Profile
                  </button>
                  <button
                    className="w-[48%] bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          <>
            <button
              className="bg-blue-300 font-medium text-lg text-blue-600 px-4 py-1 rounded cursor-pointer"
              onClick={() => openModal('login')}
            >
              Login
            </button>
            <button
              className="bg-emerald-400 font-medium text-lg text-blue-600 px-4 py-1 rounded cursor-pointer"
              onClick={() => openModal('register')}
            >
              Register
            </button>
          </>
        )}
      </div>
      {isModalOpen && (
        <Modal type={modalType} onClose={() => setIsModalOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
