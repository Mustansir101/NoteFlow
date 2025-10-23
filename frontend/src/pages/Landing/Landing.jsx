import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdOutlineSpeed,
  MdSecurity,
  MdSync,
  MdCheck,
  MdArrowForward,
} from "react-icons/md";
import { BookOpen } from "lucide-react";
import Footer from "../../components/Footer/Footer";

function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MdOutlineSpeed className="text-4xl text-[#2B85FF]" />,
      title: "Lightning Fast",
      description:
        "Create, edit, and search through thousands of notes instantly with our optimized React interface.",
    },
    {
      icon: <MdSecurity className="text-4xl text-[#2B85FF]" />,
      title: "Secure & Private",
      description:
        "Your notes are encrypted and stored securely. Only you have access to your personal thoughts and ideas.",
    },
    {
      icon: <MdSync className="text-4xl text-[#2B85FF]" />,
      title: "Always Synced",
      description:
        "Access your notes from anywhere. Changes sync instantly across all your devices in real-time.",
    },
  ];

  const whyChooseUs = [
    "Built with modern MERN stack technology",
    "End-to-end encryption for maximum security",
    "Real-time synchronization across devices",
    "Intuitive and user-friendly interface",
    "Powerful search and organization features",
    "Free to use with premium features available",
  ];

  const mockNotes = [
    {
      title: "Project Ideas",
      content:
        "1. Build a task management app\n2. Create a weather dashboard\n3. Design a portfolio website",
      tags: ["work", "ideas"],
      isPinned: true,
    },
    {
      title: "Grocery List",
      content: "• Milk\n• Bread\n• Eggs\n• Fruits\n• Vegetables",
      tags: ["personal", "shopping"],
      isPinned: false,
    },
    {
      title: "Meeting Notes",
      content:
        "Discussed Q4 goals, new product features, and team expansion plans for next year.",
      tags: ["work", "meetings"],
      isPinned: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fdfeff]">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center group">
                <div className="relative flex items-center justify-center w-10 h-10 mr-3 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300">
                  <BookOpen className="h-5 w-5 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-purple-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <button
                  onClick={() => navigate("/")}
                  className="text-xl font-semibold text-slate-800 hover:text-blue-600 transition-colors duration-200 outline-none rounded-lg px-2 py-1 relative"
                >
                  NoteFlow
                  <span className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-[#2B85FF] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Features
                </a>
                <a
                  href="#why-choose-us"
                  className="text-gray-600 hover:text-[#2B85FF] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Why Choose Us
                </a>
                <Link
                  to="/Dashboard"
                  className="text-gray-600 hover:text-[#2B85FF] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/login"
                  className="bg-[#2B85FF] hover:bg-blue-600 text-white ml-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Log in
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <Link
                to="/login"
                className="text-gray-600 hover:text-[#2B85FF] px-3 py-2 rounded-md text-sm font-medium mr-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#2B85FF] hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Capture Your</span>
                <span className="block text-[#2B85FF]">Thoughts Instantly</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                The fastest way to organize your ideas, thoughts, and important
                information. Create, edit, and access your notes from anywhere
                with our beautiful, intuitive interface.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/dashboard"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2B85FF] hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Go to Dashboard
                    <MdArrowForward className="ml-2 text-lg" />
                  </Link>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
                {/* Abstract gradient shapes */}
                <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div
                  className="absolute -bottom-8 -left-4 w-72 h-72 bg-gradient-to-br from-pink-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div
                  className="absolute -top-8 left-20 w-72 h-72 bg-gradient-to-br from-yellow-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
                  style={{ animationDelay: "4s" }}
                ></div>

                {/* Mock app interface */}
                <div className="relative bg-white rounded-xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-[#2B85FF] rounded-t-lg p-4 -m-6 mb-4">
                    <h3 className="text-white font-semibold">My Notes</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900">
                        Project Ideas
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Build amazing apps...
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900">
                        Meeting Notes
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Discussed Q4 goals...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features for Modern Note-Taking
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to capture, organize, and access your thoughts
              efficiently.
            </p>
          </div>
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative group bg-white p-8 rounded-xl border border-gray-200 hover:border-[#2B85FF] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-lg group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-gray-900 group-hover:text-[#2B85FF] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Why Choose NoteFlow?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Built with cutting-edge technology and designed with your
                productivity in mind.
              </p>
              <div className="mt-8 space-y-4">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <MdCheck className="h-6 w-6 text-[#2B85FF]" />
                    </div>
                    <p className="ml-3 text-lg text-gray-700">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-[#2B85FF] to-blue-600 rounded-lg p-4 mb-6">
                  <h3 className="text-white font-semibold text-lg">
                    Your Notes Dashboard
                  </h3>
                </div>
                <div className="space-y-4">
                  {mockNotes.map((note, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {note.title}
                        </h4>
                        {note.isPinned && (
                          <span className="text-xs bg-[#2B85FF] text-white px-2 py-1 rounded">
                            Pinned
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3 whitespace-pre-line">
                        {note.content}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {note.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-blue-100 text-[#2B85FF] px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Landing;
