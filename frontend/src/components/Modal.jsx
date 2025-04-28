import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { IoMdCloseCircle } from "react-icons/io";

const Modal = ({ type, onClose }) => {
  const [formType, setFormType] = useState(type);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    state: "",
    category: "",
    qualification: "",
    income: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const url =
        formType === "login"
          ? "http://localhost:5000/api/users/login"
          : "http://localhost:5000/api/users/register";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        if (formType === "login") {
          dispatch(authActions.login());
        }
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred. Please try again.");
    }

    onClose();
  };

  const toggleFormType = () => {
    setFormType((prevType) => (prevType === "login" ? "register" : "login"));
  };

  return (
    <div className="fixed inset-0 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-red-500">
          <IoMdCloseCircle size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">
          {formType === "login" ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit}>
          {formType === "register" && (
            <>
              {/* Name and State */}
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="state" className="block text-gray-700 font-medium mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="Enter your state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Category and Qualification */}
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    placeholder="e.g., General, OBC, SC, ST"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="qualification" className="block text-gray-700 font-medium mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    placeholder="e.g., 10th, 12th, Graduation"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Income and Email */}
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="income" className="block text-gray-700 font-medium mb-1">
                    Income
                  </label>
                  <input
                    type="text"
                    id="income"
                    name="income"
                    placeholder="Enter annual income"
                    value={formData.income}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Login Email (if login form) */}
          {formType === "login" && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          )}

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            {formType === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          {formType === "login" ? (
            <>
              Not registered yet?{" "}
              <button onClick={toggleFormType} className="text-blue-500 hover:underline">
                Register Now
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={toggleFormType} className="text-blue-500 hover:underline">
                Login Here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Modal;
