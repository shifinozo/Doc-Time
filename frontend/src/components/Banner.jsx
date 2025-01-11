import React from "react";
import { Card, Button } from "@material-tailwind/react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-3 md:mt-6">
      {/* Material Tailwind Card */}
      <Card className="w-full lg:w-full h-48 md:h-[55vh] mx-auto bg-primary relative">
        {/* Image Section */}
        <div className="w-full h-full overflow-hidden relative flex justify-center md:justify-end md:pl-40 pr-32">
          <img
            src={assets.Doct}
            alt="Doctor Illustration"
            className="w-full h-44 mt-12 md:mt-0 md:w-[65vh] md:h-[70vh] ml-80 object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="absolute bottom-24 left-8 md:bottom-40 lg:left-20 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>Book Appointment</p>
          <p>With 100+ Trusted Doctors</p>
        </div>

        {/* Button Section */}
        <div className="absolute bottom-8 md:bottom-24 left-8 md:left-40 lg:left-20">
          <Button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="md:w-40  md:h-10 w-40 p-2  bg-white text-primary text-sm hover:scale-105 transition-all"
          >
            Create Account
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Banner;
