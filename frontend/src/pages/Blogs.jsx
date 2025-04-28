import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdPostAdd } from "react-icons/md";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const usersResponse = await fetch(
          "http://localhost:5000/api/users/all"
        );
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await fetch("http://localhost:5000/api");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getAuthorName = (authorId) => {
    const user = users.find((user) => user.id === authorId);
    return user ? user.name : "Unknown Author";
  };

  const sortedBlogs = blogs.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const getRandomBlogs = (blogs, count) => {
    const shuffled = [...blogs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const randomBlogs = getRandomBlogs(blogs, 5);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 m-4">
      {/* Top Blog Section (Styled) */}
      <div className="p-3 bg-gradient-to-r from-blue-100 via-white to-blue-100 border border-blue-300 rounded-xl shadow-md text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Blogs</h1>
        <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
          Stay informed with our latest scholarship blogs, offering insights into
          funding opportunities, application tips, and success stories.
        </p>
        {/* Add Blog Button */}
        <Link
          to="/blogs/add"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
        >
          <span className="font-semibold">Add Blog</span>
          <MdPostAdd size={20} />
        </Link>
      </div>

      {/* Main Blog Content Section */}
      <div className="flex gap-10">
        {/* All Blogs */}
        <div className="w-7/12">
          <h1 className="text-center text-3xl font-semibold py-4 text-blue-700">All Blogs</h1>

          {sortedBlogs.length === 0 ? (
            <p className="text-center text-lg text-gray-600">No blogs available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {sortedBlogs.map((blog) => (
                <div key={blog.id} className="border p-4 rounded-lg shadow-lg bg-white">
                  {blog.image_url && (
                    <img
                      src={`http://localhost:5000/${blog.image_url}`}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                  <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
                  <p className="text-gray-500 text-sm">
                    Author: {getAuthorName(blog.user_id)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Published on: {formatDate(blog.created_at)}
                  </p>
                  <Link to={`/blogs/${blog.id}`}>
                    <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Popular Blogs */}
        <div className="w-5/12 flex justify-center">
          <div className="w-full lg:w-10/12">
            <h1 className="text-center text-3xl font-semibold py-4 text-blue-700">Popular Blogs</h1>
            {randomBlogs.length === 0 ? (
              <p className="text-center text-lg text-gray-600">No blogs available</p>
            ) : (
              <div className="flex flex-col gap-6 items-center">
                {randomBlogs.map((blog) => (
                  <div key={blog.id} className="border p-4 rounded-lg shadow-lg bg-white w-full">
                    {blog.image_url && (
                      <img
                        src={`http://localhost:5000/${blog.image_url}`}
                        alt={blog.title}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    )}
                    <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
                    <p className="text-gray-500 text-sm">
                      Author: {getAuthorName(blog.user_id)}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Published on: {formatDate(blog.created_at)}
                    </p>
                    <Link to={`/blogs/${blog.id}`}>
                      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
                        View Details
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
