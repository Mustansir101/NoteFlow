import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdOutlineNote } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <MdOutlineNote className="text-3xl text-[#2B85FF] mr-2" />
              <span className="text-2xl font-bold text-white">NoteFlow</span>
            </div>
            <p className="text-gray-400 text-base">
              The modern way to capture, organize, and access your thoughts from
              anywhere.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Product
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#features"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      API
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Integrations
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      GDPR
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-[#2B85FF] transition-colors duration-200"
                    >
                      Status
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2025 NoteFlow. All rights reserved. Built with ❤️ for better
            productivity.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
