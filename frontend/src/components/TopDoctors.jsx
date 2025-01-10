import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Button } from '@material-tailwind/react';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  // State to toggle showing limited or all doctors
  const [showAll, setShowAll] = useState(false);

  // Determine the doctors to display
  const displayedDoctors = showAll ? doctors : doctors.slice(0, 3);

  return (
    <div className="flex flex-col my-6 text-[#262626] md:mx-10">
      {/* Title Section */}
      <div className="flex justify-between items-center px-3 sm:px-0">
        <h1 className=" text-xl md:text-3xl font-bold">Recommendation Doctor</h1>
        {!showAll && (
          <button
            onClick={() => {
              setShowAll(true); // Show all doctors on the same page
            }}
            className="text-blue-600 text-sm font-medium"
          >
            See All
          </button>
        )}
      </div>

      {/* Doctor List */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 pt-5 px-3 sm:px-0 ">
        {displayedDoctors.map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="flex items-center bg-[#EAEFFF] border border-[#C9D8FF] rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-300"
            key={index}
          >
            {/* Doctor Image */}
            <img
              className="w-20 h-20 object-cover rounded-full  bg-[#ebf1f4] "
              src={item.image}
              alt={item.name}
            />

            {/* Doctor Details */}
            <div className="ml-4 flex flex-col">
              <p className="text-lg font-medium text-[#262626]">{item.name}</p>
              <p className="text-sm text-[#5C5C5C]">
                {item.speciality} | {item.hospital}
              </p>

              {/* Availability */}
              <div
                className={`flex items-center gap-2 text-sm mt-2 ${
                  item.available ? 'text-green-500' : 'text-gray-500'
                }`}
              >
                <p
                  className={`w-2 h-2 rounded-full ${
                    item.available ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                ></p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center text-sm text-[#5C5C5C] mt-2">
                <span className="text-yellow-400">★</span>
                <p className="ml-1">
                  {item.rating} ({item.reviews} reviews)
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* "See Less" Button */}
      {showAll && (
        <button
          onClick={() => {
            setShowAll(false); // Go back to showing only 2 doctors
            scrollTo(0, 0);
          }}
          className="bg-primary text-white px-12 py-3 rounded-full mt-10"
        >
          See Less
        </button>
      )}
    </div>
  );
};

export default TopDoctors;
