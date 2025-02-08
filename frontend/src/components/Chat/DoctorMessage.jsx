

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import { Button, Input } from "@material-tailwind/react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const DoctorMessage = () => {
  const { doctorId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const { doctors, backendUrl, token } = useContext(AppContext);

  // Fetch doctor information based on doctorId
  const fetchDocInfo = () => {
    const selectedDoc = doctors.find((doc) => doc._id === doctorId);
    setDocInfo(selectedDoc);
  };

  // Fetch appointment data example
  const fetchAppointmentData = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId: doctorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Appointment Data:", response.data);
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) fetchDocInfo();
    fetchAppointmentData();
  }, [doctors, doctorId]);

  if (!docInfo) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading doctor details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 bg-primary text-white rounded-b-2xl">
        <div className="flex items-center gap-3">
          <img
            src={docInfo.image}
            alt="Doctor Icon"
            className="w-10 h-10 rounded-full"
          />
          <p className="font-medium">{docInfo.name}</p>
        </div>
        <IoCallOutline size={24} className="cursor-pointer" />
      </div>

      {/* Chat Section */}
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        {/* Messages Section Placeholder */}
      </div>

      {/* Input Section */}
      <div className="flex items-center p-4 bg-white border-t shadow-lg">
        <Input variant="outlined" className="flex-1 mr-2" label="Type a message" />
        <Button className="bg-primary p-3">Send</Button>
      </div>
    </div>
  );
};

export default DoctorMessage;
