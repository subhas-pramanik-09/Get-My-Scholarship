import React, { useEffect, useRef } from "react";
import Scholarship from "../assets/scholarship_01.jpg";
import Features from "../components/Features";
import ProfileBased from "../components/ProfileBased";

const Home = () => {
  const profileSectionRef = useRef(null); // Reference to Profile-Based section

  useEffect(() => {
    const homePage = document.querySelector('.home-page');
    homePage.classList.add('fade-in');
  }, []);

  // Scroll to Profile-Based section
  const scrollToProfileSection = () => {
    profileSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-page opacity-0 transition-all duration-1000 min-h-screen bg-gradient-to-r from-teal-200 via-blue-100 to-lime-200 text-gray-900">
      {/* First Section: Image with Text */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-6 py-12 md:px-16">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src={Scholarship}
            alt="Scholarship"
            className="w-4/5 h-auto object-cover rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
          />
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-800">
            AI-Powered Scholarship Finder
          </h1>
          <p className="text-lg text-gray-700">
            Unlock personalized scholarship opportunities with the power of AI! Get recommendations based on your profile and qualifications.
          </p>
          {/* Button Group */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            <a
              href="/blogs"
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Explore Blogs
            </a>
            <a
              href="/scholarships"
              className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Browse Scholarships
            </a>
            <button
              onClick={scrollToProfileSection} // Trigger smooth scroll
              className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Profile-Based Recommendations
            </button>
          </div>
        </div>
      </div>

      {/* Second Section: Features Section */}
      <div className="w-full py-12 bg-gray-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Key Features</h2>
          <p className="text-lg text-gray-600">
            Explore the powerful AI features of our platform that tailor recommendations to your profile.
          </p>
        </div>
        <Features />
      </div>

      {/* Third Section: Scholarships Based on Your Profile */}
      <div ref={profileSectionRef} className="w-full py-12 bg-gradient-to-b from-teal-200 to-blue-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Scholarships Tailored to You</h2>
          <p className="text-lg text-gray-600">
            Find scholarships that perfectly match your unique qualifications and interests.
          </p>
        </div>
        <div className="mt-8">
          <ProfileBased />
        </div>
      </div>
    </div>
  );
};

export default Home;
