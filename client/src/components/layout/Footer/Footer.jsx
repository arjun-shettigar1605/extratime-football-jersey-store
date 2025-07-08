import React from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { Github, Linkedin, Instagram} from 'lucide-react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-lg font-bold text-xl">
                <img
                  src="/images/logo.png"
                  alt="Football jerseys display"
                  className="inline justify-center items-center w-48 h-full object-cover"
                />
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Your ultimate destination for authentic football jerseys, retro
              classics, and the latest team gear. We bring you closer to the
              beautiful game.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/arjun-shettigar/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin color="#c1ff72" className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/arjun-shettigar1605"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <Github color="#c1ff72" className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram color="#c1ff72" className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="https://qikink.com/wp-content/uploads/2023/08/AOP-round-neck-half-sleeve-size-chart-qikink-1024x538.webp"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Size Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-gray-300">
                  Hyderabad, Telangana, India
                </span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-gray-300">+91 42042 04200</span>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-gray-300">
                  support@extratimestore.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Extra Time Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
