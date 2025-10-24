import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import Footer from "../../components/Footer/Footer";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setError(null);

    // login API call Integration
    try {
      const response = await axiosInstance.post("/login", {
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

  const handleDemoLogin = async () => {
    setEmail("John@gmail.com");
    setPassword("123456");
    Login();
  };

  return (
    <div className="min-h-screen bg-[#fdfeff] flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center mb-30 px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-md w-full mt-10 space-y-2">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
              <p className="mt-2 text-gray-600">
                Sign in to your account to continue your note-taking journey.
                <span className="text-blue-600 font-bold">
                  {" "}
                  Try Demo Account
                </span>
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  Log In
                </button>
                <button
                  onClick={handleDemoLogin}
                  className="w-full py-2 px-4 bg-orange-500 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm"
                >
                  Login as Demo User
                </button>

                <div className="text-left">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-semibold text-[#2B85FF] hover:text-blue-600 transition-colors duration-200"
                    >
                      Create one here
                    </Link>
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    Note: Server takes 50-60 seconds to get active, as hosted on
                    a free service
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 mt-5">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Your ideas deserve a
                <span className="text-[#2B85FF] block">beautiful home</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of users who trust NoteFlow to capture, organize,
                and sync their most important thoughts across all devices.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">
                    Lightning fast note creation
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">
                    Secure cloud synchronization
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">
                    Powerful search & organization
                  </span>
                </div>
              </div>

              {/* Mock Notes Preview */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-[#2B85FF] rounded-t-lg p-3 -m-6 mb-4">
                  <h3 className="text-white font-semibold text-sm">
                    Recent Notes
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 text-sm">
                      Project Ideas 💡
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Build amazing apps with React...
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 text-sm">
                      Meeting Notes 📝
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Discussed Q4 goals and...
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 text-sm">
                      Travel Plans ✈️
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Visit Tokyo in spring...
                    </p>
                  </div>
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

export default Login;
