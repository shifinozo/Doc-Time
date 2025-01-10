import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Button, Card } from "@material-tailwind/react";
import Doct from '../../src/assets/doct.png'
import SpecialityMenu from "../components/SpecialtyMenu"
import TopDoctors from "../components/TopDoctors"

function Booking() {
  const { userData } = useContext(AppContext);

  return (
    <div className="mx-4 md:mx-12 mt-4 text-[#262626]">
      <div className="flex justify-between items-center">
        {/* Greeting Section */}
        <div>
          <h1 className="font-bold text-3xl">Hi {userData.name}</h1>
          <h5 className="text-gray-600">How are you today?</h5>
        </div>

        {/* Notification Icon with Badge */}
        <div className="relative p-2 bg-[#eaf2ff] rounded-full">
          <IoMdNotificationsOutline className="text-black text-2xl" />
          {/* Badge */}
          <span className="absolute -top-0 -right-0 w-3 h-3 flex items-center justify-center text-xs font-bold text-white bg-red-600 rounded-full"></span>
        </div>
      </div>

      {/* Responsive Card Section */}
      <div className="mt-3 md:mt-6">
        <Card className="w-full lg:w-full h-48  md:h-[55vh] mx-auto bg-primary relative">
          {/* Image Container with flex for alignment */}
          <div className="w-full h-full overflow-hidden relative flex justify-center md:justify-end md:pl-40  pr-32">
            <img
              src={Doct}
              alt="card-image"
              className="w-full h-44 mt-12 md:mt-0 md:w-[65vh] md:h-[70vh] ml-80 object-cover" // Ensures image covers entire area and adapts to screen size
            />
          </div>

          {/* Typography for Heading with Text Color and Prose Styling */}
          <div className="absolute bottom-24 left-8  md:bottom-40 lg:left-20 text-xl  sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
            <p>Book and schedule with</p>
            <p className="">nearest doctor</p> {/* Added margin-top to adjust spacing */}
          </div>

          {/* Button - Positioned to the left */}
          <div className="absolute bottom-10 md:bottom-24 left-8 md:left-40 lg:left-20">
            <Button className="md:w-36 md:h-10 w-28 p-2  bg-white text-primary text-sm">Find nearby</Button> {/* Adjusted button width for responsiveness */}
          </div>
        </Card>
      </div>
      <SpecialityMenu />
      <TopDoctors />
    </div>
  );
}

export default Booking;

