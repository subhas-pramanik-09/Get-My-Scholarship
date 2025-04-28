import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoCloseCircle } from "react-icons/io5";
import RecommendationForm from "../components/RecommendationForm"; // Import the form component

const ITEMS_PER_PAGE = 9;

const Scholarships = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn); // Check if the user is logged in
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [scholarships, setScholarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch the scholarship data
    const fetchScholarships = async () => {
      try {
        const response = await fetch("/csvjson.json");
        const data = await response.json();
        setScholarships(data);
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchScholarships();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const currentScholarships = scholarships.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4 mx-10">

      {isLoggedIn ? (
        <>
          <div className="m-6 p-6 bg-gradient-to-r from-blue-100 via-white to-blue-100 border border-blue-300 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              🎓 Get Personalized Scholarship Recommendations
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Let our AI recommend scholarships tailored just for you. Answer a few questions, and we’ll match you with the best opportunities based on your profile.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              🤖 Get Recommendations
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
              <div className="relative bg-white p-6 rounded shadow-lg w-6/12">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-red-500 text-3xl"
                >
                  <IoCloseCircle />
                </button>
                <RecommendationForm />
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="m-5 text-lg text-center text-red-500">
          Please log in to get scholarship recommendations.
        </p>
      )}


      <div className="mt-6 mx-10">
        {currentScholarships.length === 0 ? (
          <p>No scholarships available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentScholarships.map((scholarship) => (
              <div
                key={scholarship.ID}
                className="bg-white/80 backdrop-blur-md border-2 border-transparent hover:border-blue-500 hover:scale-105 transition-all duration-300 rounded-xl shadow-md p-5 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-2">{scholarship.Name}</h2>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-4">{scholarship.Description}</p>
                </div>
                <a
                  href={scholarship.LINKS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-blue-600 text-blue-600 font-medium px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  Go to Website
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 3h7m0 0v7m0-7L10 14"
                    />
                  </svg>
                </a>


              </div>
            ))}
          </div>

        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Previous
          </button>
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scholarships;
