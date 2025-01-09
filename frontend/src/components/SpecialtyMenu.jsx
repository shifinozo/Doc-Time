import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-2 py-8 text-[#262626] "
    >
      <h1 className="text-3xl font-bold">
        Find by <span className="text-primary">Speciality</span>
      </h1>

      <div className="flex sm:justify-center gap-4 pt-2 w-full overflow-x-scroll snap-x snap-mandatory ">
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-transform duration-500 bg-[#eaf2ff] rounded-full p-4"
            key={index}
          >
            <img
              className="w-10 md:w-24"
              src={item.image}
              alt={`${item.speciality} icon`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
