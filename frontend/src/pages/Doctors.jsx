import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdFilterList } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

function Doctors() {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="fixed w-full min-h-screen h-screen overflow-hidden">
      {/* Input Bar and Filter Button */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="relative w-80 md:w-96 max-w-lg flex items-center justify-center">
          <input
            type="text"
            placeholder="Search doctor name"
            className="w-full px-2 py-2 pr-10 border border-gray-300 rounded-l-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          {/* Filter Button */}
          <Button
            className="bg-white hover:bg-gray-100 text-gray-500 text-xl rounded-md p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
            onClick={() => setShowFilter(true)}
          >
            <MdFilterList />
          </Button>
        </div>
      </div>

      {/* Material Tailwind Dialog */}
      <Dialog open={showFilter} handler={() => setShowFilter(false)}>
        <DialogHeader>Filter by Speciality</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-2">
            {[
              "General physician",
              "Gynecologist",
              "Dermatologist",
              "Pediatricians",
              "Neurologist",
              "Gastroenterologist",
            ].map((specialityOption) => (
              <p
                key={specialityOption}
                onClick={() =>
                  speciality === specialityOption
                    ? navigate("/doctors")
                    : navigate(`/doctors/${specialityOption}`)
                }
                className={`cursor-pointer p-2 border rounded ${
                  speciality === specialityOption ? "bg-indigo-100" : ""
                }`}
              >
                {specialityOption}
              </p>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            onClick={() => setShowFilter(false)}
            className="mr-2 bg-primary"
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Google Map */}
      <iframe
        className="w-full h-full"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=perinthalmanna&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        title="Google Map"
      ></iframe>
    </div>
  );
}

export default Doctors;
