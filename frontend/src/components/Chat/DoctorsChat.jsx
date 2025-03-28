import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { List, ListItem, ListItemPrefix, Typography, Avatar } from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa";
import Login from "../../pages/Login";

const DoctorsChat = () => {
  const navigate = useNavigate();
  const { doctors, userData } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render Login if userData is falsy
  if (!userData) return <Login />;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="lg:w-[30%] w-full shadow-md p-4 overflow-auto">
        <Typography variant="h4" className="font-bold text-center mb-4">
          Message
        </Typography>

        {/* Search Bar Section */}
        <div className="flex items-center mb-2 px-6 gap-4">
          <input
            type="text"
            placeholder="Search Doctor"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-lg border rounded-md p-2"
            aria-label="Search Doctor"
          />
          <button
            aria-label="Add Doctor"
            className="text-primary cursor-pointer rounded-full bg-black p-2 w-8 h-8 flex items-center justify-center"
          >
            <FaPlus size={20} />
          </button>
        </div>

        {/* Doctors List */}
        <List>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <ListItem
                key={doctor._id}
                className="cursor-pointer hover:bg-gray-100 border-b border-gray-300"
                onClick={() => navigate(`/doctorMessage/${doctor._id}`)}
              >
                <ListItemPrefix>
                  <Avatar
                    src={doctor.image}
                    alt={doctor.name}
                    size="md"
                    className="border border-blue-500"
                  />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" className="font-semibold">
                    {doctor.name}
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    {doctor.speciality}
                  </Typography>
                </div>
              </ListItem>
            ))
          ) : (
            <Typography variant="small" className="text-gray-500 text-center py-4">
              No doctors found.
            </Typography>
          )}
        </List>
      </div>
    </div>
  );
};

export default DoctorsChat;
