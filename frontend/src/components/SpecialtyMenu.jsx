import React, { useState } from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  const [showAll, setShowAll] = useState(false); // State to toggle showing all specialities

  // Determine the specialities to display
  const displayedSpecialities = showAll ? specialityData : specialityData.slice(0, 5);

  return (
    <div
      id="speciality"
      className="flex flex-col gap-2 py-8 text-[#262626]"
    >
      {/* Title Section */}
      <div className="flex justify-between items-center w-full px-4 sm:px-0">
        <h1 className="text-3xl font-bold">
          Find by <span className="text-primary">Speciality</span>
        </h1>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 text-sm font-medium"
        >
          {showAll ? "See Less" : "See All"}
        </button>
      </div>

      {/* Speciality List */}
      <div className="flex sm:justify-center gap-4 pt-2 w-full overflow-x-auto snap-x snap-mandatory">
        {displayedSpecialities.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-transform duration-500 bg-[#eaf2ff]  rounded-full p-4"
            key={index}
          >
            <img
              className="w-12 md:w-24"
              src={item.image}
              alt={`${item.speciality} icon`}
            />
            <p className="mt-2 text-center font-medium">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
