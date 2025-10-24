import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import Footer from "../../components/Footer/Footer";

function SignUp() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all the fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);

    // Signup Api calls
    try {
      const response = await axiosInstance.post("/create-account", {
        fullname: name,
        email,
        password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-[#fdfeff] flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - SignUp Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full space-y-3">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-gray-600">
                Join NoteFlow and start organizing your thoughts like never
                before
              </p>
            </div>

            {/* SignUp Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B85FF] focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B85FF] focus:border-transparent transition-all duration-200 outline-none bg-gray-50 focus:bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-red-400 mr-3"></div>
                      <p className="text-red-700 text-sm font-medium leading-snug">
                        {error === "An unexpected error occurred."
                          ? "Server not active, please wait for a few seconds and try again."
                          : error}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#2B85FF] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  Create Account
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-[#2B85FF] hover:text-blue-600 transition-colors duration-200"
                    >
                      Log in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 py-12">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Start your journey to
                <span className="text-[#2B85FF] block">
                  better productivity
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform the way you capture and organize your thoughts. Built
                for modern professionals who value efficiency and elegance.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2B85FF]">10K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2B85FF]">1M+</div>
                  <div className="text-sm text-gray-600">Notes Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2B85FF]">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2B85FF] to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">JS</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm">
                      John Smith
                    </div>
                    <div className="text-xs text-gray-600">Product Manager</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic">
                  "NoteFlow has completely transformed how I organize my
                  thoughts. The seamless sync across devices means I never lose
                  an idea again!"
                </p>
                <div className="flex text-yellow-400 mt-3 justify-center">
                  {"★".repeat(5)}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex items-center justify-center space-x-6 text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-xs">SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-xs">GDPR Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="text-xs">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignUp;
