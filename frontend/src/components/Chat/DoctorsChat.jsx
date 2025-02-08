import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Avatar,
} from "@material-tailwind/react";




const DoctorsChat = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  

  
  const displayedDoctors = doctors;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for large screens */}
      <div className="hidden lg:block shadow-md p-4 overflow-auto w-[30%]">
      <Typography variant="h4" className="font-bold text-center mb-4">
          Message
        </Typography>
        <div className="flex justify-center mb-2 px-8">
          <input
            type="text"
            placeholder="Search Doctor"
            className="w-full max-w-lg border rounded-md p-2"
          />
        </div>
        <List>
          {displayedDoctors.map((doctor) => (
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
          ))}
        </List>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2 overflow-auto md:hidden">
        <Typography variant="h4" className="font-bold text-center mb-4">
          Message
        </Typography>
        <div className="flex justify-center mb-2 px-8">
          <input
            type="text"
            placeholder="Search Doctor"
            className="w-full max-w-lg border rounded-md p-2"
          />
        </div>
        <List>
          {displayedDoctors.map((doctor) => (
            <ListItem
              key={doctor._id}
              className="cursor-pointer hover:bg-gray-100 border-b border-gray-300"
              onClick={() => navigate(`/appointment/${doctor._id}`)}
            >
              <ListItemPrefix>
                <Avatar
                  src={doctor.image}
                  alt={doctor.name}
                  size="lg"
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
          ))}
        </List>
      </div>
   

    </div>
  );
};

export default DoctorsChat;
