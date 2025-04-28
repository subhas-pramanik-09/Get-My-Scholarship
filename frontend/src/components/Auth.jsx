import React from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-4">You are not logged in</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        To access this page, please log in to your account. If you don't have one, you can sign up in just a few steps.
      </p>
      <div className="flex gap-6">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg transition duration-200"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg text-lg transition duration-200"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Auth;
