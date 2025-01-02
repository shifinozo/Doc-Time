import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-2 py-16 text-[#262626]"
    >
      <h1 className="text-3xl font-medium">
        Find by <span className="text-primary">Speciality</span>
      </h1>
      <p className=" text-center text-xl text-gray-500 ">
        Search Your Doctor and Book Appointment in one click
      </p>
      <div className="flex items-center gap-2 ">
        <div className="md:flex-1 md:max-w-xs md:w-80">
          <Input label="Search" className="text-center" />
        </div>
        <Button className="w-16  md:w-20 flex items-center justify-center bg-primary">
          Search
        </Button>
      </div>

      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll ">
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="w-16 sm:w-24 mb-2 " src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
