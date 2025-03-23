import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center h-min-screen">
      <div className="text-center text-2xl pt-10 text-gray-500 dark:text-gray-200 ">
        <p>
          CONTACT{" "}
          <span className="text-gray-700 dark:text-gray-600 font-semibold">
            US
          </span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-[320px] md:max-w-[360px] rounded-lg"
          src={assets.contact_image}
          alt=""
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600 dark:text-gray-200">
            Our Office
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            <br />
            India
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Tel : +91 8590333232 <br />
            Email: doctime@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600 dark:text-gray-200">
            Careers at DocTime
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Learm more about our teams and job openings.
          </p>
          <button className="border border-black rounded-lg dark:text-white px-8 py-4 text-sm hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-black   transition-all duration-500">
            Explore Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
