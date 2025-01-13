import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { Card, Button , Carousel  } from "@material-tailwind/react";
import { CiClock2 } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { PiChatCenteredTextFill } from "react-icons/pi";
const MyAppointments = () => {
  const { backendUrl, token ,doctors } = useContext(AppContext);

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [payment, setPayment] = useState("");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        setAppointments((prev) =>
          prev.map((app) =>
            app._id === appointmentId ? { ...app, cancelled: true } : app
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-stripe",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  
const upcomingAppointments = appointments.filter(
  (app) => !app.cancelled && !app.isCompleted
);
  const paymentSuccessAppointments = appointments.filter(
    (app) => !app.cancelled && app.isCompleted
  );
  const appointmentHistory = appointments.filter(
    (app) => app.cancelled || app.isCompleted
  );

  return (
    <div className="mx-4 md:mx-10">
      <div className="flex items-center justify-center">
        <p className="pb-3 mt-8 text-xl md:text-3xl font-bold text-black border-b">
          My Appointments
        </p>
      </div>

      {/* Upcoming Appointments */}

      <div className="mt-2">
      <Carousel>
        
        {upcomingAppointments.length === 0 ? (
          <p className="text-sm text-gray-600">No Appointments.</p>
        ) : (
          upcomingAppointments.map((item, index) => (
            <div className="flex ">
              <Card className="w-full h-auto px-4 md:px-14  rounded-3xl bg-primary mt-4 md:text-2xl text-sm text-white font-medium">
              {/* Header Section */}
              <div className="flex justify-between items-center mt-3">
                <h2 className="mt-2 text-lg font-bold">Appointments</h2>
                
              </div>

              {/* Date and Time */}
              <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col gap-2">
                  <p className="flex items-center gap-2">
                    <CiCalendarDate className="text-xl" />
                    {slotDateFormat(item.slotDate)}
                  </p>
                  <p className="flex items-center gap-2">
                    <CiClock2 className="text-xl" />
                    {item.slotTime}
                  </p>
                </div>
                <img
                  className="w-14 h-14 rounded-full object-cover"
                  src={assets.Telegram}
                  alt="Appointment Icon"
                />
              </div>

              {/* Doctor Details Section */}
              <div
                className="mt-2 mb-4 flex items-center justify-between gap-4 bg-white px-4 h-20 md:mx-72 md:w-[100vh] rounded-lg cursor-pointer"
                onClick={() => {
                  navigate(`/appointment/${item._id}`);
                  scrollTo(0, 0);
                }}
                key={index}
              >
                
                {/* Doctor Image */}
                <div className="flex items-center gap-4">
                  <img
                    className="w-14 h-14 rounded-full bg-[#78716c] object-cover text-black"
                    src={item.docData.image}
                    alt={`Dr. ${item.docData.name}`}
                  />
                  {/* Doctor Details */}
                  <div className="text-sm text-black">
                    <p className="text-lg font-semibold text-black">
                      {item.docData.name}
                    </p>
                    <p className="text-gray-500">{item.docData.speciality}</p>
                  </div>
                </div>
                {/* Icon */}
                <PiChatCenteredTextFill className="size-8 text-black" />
                
              </div>

              <div className="flex mb-10 gap-2 justify-center text-sm text-center">
                {!item.payment &&
                  !item.cancelled &&
                  !item.isCompleted &&
                  payment !== item._id && (
                    <Button
                      onClick={() => setPayment(item._id)}
                      className=" sm:min-w-32  p-3 border rounded-lg bg-green-500 text-white transition-all duration-300"
                    >
                      Pay Online
                    </Button>
                  )}
                {!item.payment &&
                  !item.cancelled &&
                  !item.isCompleted &&
                  payment === item._id && (
                    <>
                      <Button
                        onClick={() => appointmentStripe(item._id)}
                        className="text-[#696969] sm:min-w-20 p-2 bg-white py-0 border rounded hover:bg-gray-100 transition-all flex items-center justify-center"
                      >
                        <img
                          className="max-w-10 max-h-7"
                          src={assets.stripe_logo}
                          alt=""
                        />
                      </Button>
                      <Button
                        onClick={() => appointmentRazorpay(item._id)}
                        className="text-[#696969] sm:min-w-20 p-2 bg-white border rounded hover:bg-gray-100 transition-all flex items-center justify-center"
                      >
                        <img
                          className="max-w-10 max-h-7"
                          src={assets.razorpay_logo}
                          alt=""
                        />
                      </Button>
                    </>
                  )}
                <Button
                  onClick={() => cancelAppointment(item._id)}
                  className=" sm:min-w-32  p-3 border rounded-lg bg-red-500 text-white transition-all duration-300"
                >
                  Cancel Appointment
                </Button>
                
              </div>
            </Card>
            </div>
          ))
        )}
         </Carousel>
      </div>
      {/* Payment Success Appointments */}
      <div>
        <h2 className="mt-6 mb-4 text-lg font-bold">
          Payment Success Appointments
        </h2>
        {paymentSuccessAppointments.length === 0 ? (
          <p className="text-sm text-gray-600">No appointments found.</p>
        ) : (
          paymentSuccessAppointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
            >
              <div>
                <img
                  className="w-36 bg-[#EAEFFF]"
                  src={item.docData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-sm text-[#5E5E5E]">
                <p className="text-[#262626] text-base font-semibold">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="mt-1">
                  <span className="text-sm text-[#3C3C3C] font-medium">
                    Date & Time:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Appointment History */}
      <div>
        <h2 className="mt-6 mb-4 text-lg font-bold">Cencel Appointments</h2>
        {appointmentHistory.length === 0 ? (
          <p className="text-sm text-gray-600">No appointment history.</p>
        ) : (
          appointmentHistory.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
            >
              <div>
                <img
                  className="w-36 bg-[#EAEFFF]"
                  src={item.docData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-sm text-[#5E5E5E]">
                <p className="text-[#262626] text-base font-semibold">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-[#464646] font-medium mt-1">Address:</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
                <p className="mt-1">
                  <span className="text-sm text-[#3C3C3C] font-medium">
                    Date & Time:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-end text-sm text-center">
                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Completed
                  </button>
                )}
                {item.cancelled && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Cancelled
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
