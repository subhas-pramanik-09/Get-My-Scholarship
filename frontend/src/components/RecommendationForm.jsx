import React, { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

const RecommendationForm = () => {
  const [formData, setFormData] = useState({
    state: '',
    category: '',
    qualification: '',
    income: '',
    type: '',
  });

  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsRecommendationOpen(false);

    try {
      const response = await fetch('http://localhost:8000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setRecommendation(data);
      setIsRecommendationOpen(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const closeRecommendation = () => {
    setIsRecommendationOpen(false);
    setRecommendation(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Get Scholarship Recommendation</h1>

      {/* Show form only when recommendation modal is not open */}
      {!isRecommendationOpen && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="All">All</option>
              <option value="SEBC">SEBC</option>
              <option value="open">Open</option>
              <option value="ST">ST</option>
              <option value="SC">SC</option>
              <option value="EBC">EBC</option>
              <option value="VJNT or SBC">VJNT or SBC</option>
              <option value="OBC">OBC</option>
              <option value="SBC">SBC</option>
              <option value="VJNT">VJNT</option>
              <option value="Minority">Minority</option>
              <option value="PWD">PWD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Qualification:</label>
            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="">Select Qualification</option>
              <option value="Post-Graduation">Post-Graduation</option>
              <option value="FYJC">FYJC</option>
              <option value="HSC">HSC</option>
              <option value="Medical">Medical</option>
              <option value="Graduation">Graduation</option>
              <option value="PhD">PhD</option>
              <option value="B. Tech">B.Tech</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Income:</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="">Select Type</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Get Recommendation
          </button>
        </form>
      )}

      {/* Show recommendation when available */}
      {isRecommendationOpen && recommendation && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white/90 border border-gray-200 p-6 rounded-2xl shadow-2xl w-[90%] max-w-md relative transition-all">
          {/* Close Button */}
          <button
            onClick={closeRecommendation}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
          >
            <IoCloseCircle size={28} />
          </button>

          {/* Modal Header */}
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
            🎓 Scholarship Recommendation
          </h2>

          {/* Content */}
          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-medium">Name:</span> {recommendation.Name}
            </p>
            <p>
              <span className="font-medium">Description:</span> {recommendation.Description}
            </p>
            <div className="pt-2">
              <a
                href={recommendation.LINKS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-400 text-white px-4 py-2 rounded-lg shadow"
              >
              Apply Now : {recommendation.LINKS}
              </a>
            </div>
          </div>
        </div>
      </div>
    )}



      {/* Show error if any */}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default RecommendationForm;
