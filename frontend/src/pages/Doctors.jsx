import React, { useContext, useEffect, useState, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { MdFilterList } from "react-icons/md";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Card, CardBody } from "@material-tailwind/react";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Available Specialties
  const specialities = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist",
  ];

  // Memoized Doctor Filtering
  const filteredDoctors = useMemo(() => {
    let result = doctors;

    if (speciality) {
      result = result.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      result = result.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [doctors, speciality, searchQuery]);

  return (
    <div className="md:mx-10 mx-5 mt-4">
      {/* Search Bar & Filter */}
      <div className="flex items-center justify-center md:justify-start gap-4">
  <div className="relative w-full md:w-96 flex">
    <input
      type="text"
      placeholder="Search doctor by name..."
      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <Button
      className="bg-white hover:bg-gray-100 text-gray-700 text-xl rounded-lg p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
      onClick={() => setShowFilter(true)}
    >
      <MdFilterList />
    </Button>
  </div>
</div>

      {/* Filter Dialog */}
      <Dialog open={showFilter} handler={() => setShowFilter(false)}>
        <DialogHeader>Filter by Speciality</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-2">
            {specialities.map((specialityOption) => (
              <p
                key={specialityOption}
                onClick={() =>
                  speciality === specialityOption
                    ? navigate("/doctors")
                    : navigate(`/doctors/${specialityOption}`)
                }
                className={`cursor-pointer p-2 border rounded-md transition-all ${
                  speciality?.toLowerCase() === specialityOption.toLowerCase()
                    ? "bg-indigo-100 font-semibold"
                    : "hover:bg-gray-100"
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
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((item) => (
            <Card
              key={item._id}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300 bg-white shadow-md"
            >
              <img
                className="w-full h-60 object-cover bg-[#EAEFFF] hover:bg-primary transition-all"
                src={item.image}
                alt={item.name}
              />
              <CardBody>
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-[#262626] text-lg font-semibold">{item.name}</p>
                <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="col-span-3 flex flex-col items-center gap-3 text-gray-600 mt-10">
            <img
              src="/images/no-doctors.png"
              alt="No doctors found"
              className="w-40 opacity-70"
            />
            <p className="text-lg font-medium">No doctors found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
