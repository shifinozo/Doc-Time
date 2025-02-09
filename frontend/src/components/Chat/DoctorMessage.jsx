import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import { Button, Input } from "@material-tailwind/react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import DocTimePro from "../DocTimePro";

const DoctorMessage = () => {
  const { doctorId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const { doctors, backendUrl, token } = useContext(AppContext);

  // Fetch doctor information
  useEffect(() => {
    const selectedDoc = doctors.find((doc) => doc._id === doctorId);
    setDocInfo(selectedDoc || null);
  }, [doctors, doctorId]);

  // Fetch appointment data
  const fetchAppointmentData = useCallback(async () => {
    if (!doctorId) return;

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
  }, [backendUrl, doctorId, token]);

  useEffect(() => {
    fetchAppointmentData();
  }, [fetchAppointmentData]);

  if (!docInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DocTimePro />
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
        <p className="text-center text-gray-500">No messages yet.</p>
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
