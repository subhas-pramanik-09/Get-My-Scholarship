import React from 'react';
import scholarshipImage from '../assets/Logo.png'; // Add an appropriate image here

const About = () => {
  return (
    <div className="px-8 py-16">
      <div className="flex justify-center mb-12">
        {/* Logo */}
        <img
          src={scholarshipImage}
          alt="Scholarships"
          className="w-32 h-32"
        />
      </div>

      {/* Sections laid out as card-style */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-lg leading-relaxed">
            We are a team of passionate individuals dedicated to helping students find scholarships and financial aid.
            Our goal is to make education accessible for everyone.
          </p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
          <p className="text-lg leading-relaxed">
            We provide a simple and easy-to-use platform that helps students search for scholarships that match their
            needs. Whether you are looking for a government grant or a private scholarship, we’ve got you covered.
          </p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Scholarship Database</h2>
          <p className="text-lg leading-relaxed">
            Our database includes a wide variety of scholarships for students at all levels. You can find the right
            opportunities quickly with detailed search filters and up-to-date information.
          </p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Get Involved</h2>
          <p className="text-lg leading-relaxed">
            Join our community of students and mentors. Whether you're looking for financial help or want to share your
            knowledge, we welcome everyone to be a part of our journey.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
