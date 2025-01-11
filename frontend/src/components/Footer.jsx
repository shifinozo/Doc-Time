import React from "react";
import { assets } from "../assets/assets";
import { Typography } from "@material-tailwind/react";

const LINKS = [
  {
    title: "Company",
    items: ["About us", "News"],
  },
  {
    title: "Product",
    items: ["Overview", "Features"],
  },
  {
    title: "Resource",
    items: ["Blog", "Helpcenter"],
  },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="mt-6 relative w-full bg-[#EAEFFF] dark:bg-gray-900 text-gray-600 dark:text-gray-100 py-5">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {/* Left Section */}
          <div>
            <img className="mb-5 w-20" src={assets.DoctLogo} alt="Doct Logo" />
            <Typography className="leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis, laborum?
            </Typography>
          </div>

          {/* Center Section */}
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-3">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography variant="small" className="mb-3 font-medium">
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link} className="py-1.5">
                    <Typography
                      as="a"
                      href="#"
                      className="transition-colors hover:text-blue-500"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          {/* Right Section */}
          <div>
            <Typography variant="h6" className="mb-3">
              Get in Touch
            </Typography>
            <Typography>+91 0023948989</Typography>
            <Typography>DocTime@gmail.com</Typography>
            <div className="flex gap-4 mt-3">
              <a
                href="https://github.com/Shifin-Malik/Doc-Time"
                className="hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-6 w-6"
                  src={assets.Github}
                  alt="GitHub Logo"
                />
              </a>
              <a href="#" className="hover:opacity-80">
                <img
                  className="h-6 w-6"
                  src={assets.FaceBook}
                  alt="Doct Logo"
                />
              </a>
              <a href="#" className="hover:opacity-80">
                <img className="h-6 w-6" src={assets.Google} alt="Doct Logo" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-700 text-center">
          <Typography variant="small">
            &copy; {currentYear} DocTime - All Rights Reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
