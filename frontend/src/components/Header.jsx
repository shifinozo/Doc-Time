import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Card, CardBody, Button, Avatar } from "@material-tailwind/react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();
  const { token, userData, setToken } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  return (
    <div className="p-2">
      {/* Greeting Section */}
      <div className="flex justify-between items-center">
      {token && userData ? (
           <div>
           <h1 className="font-bold text-3xl">Hi {userData?.name || "Guest"}</h1>
           <h5 className="text-gray-600">How are you today?</h5>
         </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Show logo when not logged in */}
              <img
                src={assets.DoctLogo}
                alt="Doctime Logo"
                className="w-12 h-12 cursor-pointer"
                onClick={() => navigate("/")} // Navigate to the homepage on logo click
              />
              <h1 className=" font-bold text-xl md:text-3xl text-[#0284c7]">Doctime</h1>
            </div>
          )}
        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <div className="relative p-2 bg-[#eaf2ff] rounded-full">
            <IoMdNotificationsOutline className="text-black text-2xl" />
            <span className="absolute -top-0 -right-0 w-3 h-3 text-white bg-red-600 rounded-full"></span>
          </div>
          

          {/* Profile Section */}
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
             <Avatar
                src={userData.image}
                alt="avatar"
                size="sm"
                className="w-8 h-8"
              />
              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt="Dropdown Icon"
              />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
            >
              Create account
            </button>
          )}
        </div>
      </div>

      {/* Appointment Booking Section */}
      <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 mt-4">
        {/* Left Side */}
        <Card className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-[10vw] md:mb-[-30px] bg-transparent shadow-none h-72 md:h-[75vh]">
          <CardBody>
            <p className="text-2xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
              Book Appointment <br /> with Trusted Doctors
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light mt-4 prose">
              <img
                className="w-28"
                src={assets.group_profiles}
                alt="Doctors Group"
              />
              <p>
                Simply browse through our extensive list of trusted doctors,
                <br className="hidden sm:block" />
                schedule your appointment hassle-free.
              </p>
            </div>
            <Button
              href="#speciality"
              className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300 mt-6"
            >
              Book appointment{" "}
              <img
                className="w-4 "
                src={assets.arrow_icon}
                alt="Arrow Icon"
              />
            </Button>
          </CardBody>
        </Card>

        {/* Right Side */}
        <Card className="md:w-1/2 relative bg-transparent shadow-none">
          <img
            className="w-full md:absolute bottom-0 h-auto rounded-lg"
            src={assets.header_img}
            alt="Header Illustration"
          />
        </Card>
      </div>
    </div>
  );
}

export default Header;
