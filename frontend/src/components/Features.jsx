import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Browse Scholarships",
    description:
      "Explore a wide range of scholarships available for various academic levels and fields.",
    icon: "🔍",
  },
  {
    title: "Find Blogs",
    description:
      "Read insightful blogs to stay updated with the latest trends and tips in the scholarship world.",
    icon: "📰",
  },
  {
    title: "Create Blogs",
    description:
      "Share your experiences and knowledge by creating and publishing your own blogs on our platform.",
    icon: "✍️",
  },
  {
    title: "Scholarship Recommendation Engine",
    description:
      "Get personalized scholarship recommendations based on your preferences and academic profile.",
    icon: "🔮",
  },
];

const Features = () => {
  return (
    <div className="w-full py-16 px-4 md:px-12 bg-gray-50 flex justify-center items-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Features</h2>

      {/* Feature Cards in a Single Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl flex flex-col items-center text-center"
          >
            <div className="text-6xl mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
