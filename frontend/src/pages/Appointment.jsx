import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { PiChatCenteredTextFill } from 'react-icons/pi';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { toast } from 'react-toastify';


const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  // Fetch doctor information based on docId
  const fetchDocInfo = async () => {
    const selectedDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(selectedDoc);
  };

  // Fetch available slots for the doctor
  const getAvailableSlots = async () => {
    setDocSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const isSlotAvailable = !docInfo.slots_booked[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  // Book an appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment');
      return navigate('/login');
    }

    const date = docSlots[slotIndex][0].datetime;
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle dialog state
  const toggleDialog = () => setOpenDialog(!openDialog);

  // Fetch doctor info and slots on component mount or updates
  useEffect(() => {
    if (doctors.length > 0) fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  if (!docInfo) return null;

  return (
    <div className="md:m-8 m-4 min-h-screen overflow-y-auto">
      {/* ---------- Doctor Details ----------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
        </div>

        <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-1 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
              About <img className="w-3" src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment fee: <span className="text-gray-800">{currencySymbol}{docInfo.fees}</span>
          </p>

          <div className="flex gap-4 mt-4 md:mt-2 items-center justify-center mb-3">
            <Button onClick={toggleDialog} className="bg-primary md:w-60 w-48 h-12 font-bold">
              Make Appointment
            </Button>
            <div className="w-10 h-10 border border-x-2 border-y-2 border-gray-200 rounded-lg flex items-center justify-center">
             <Link to="/chat">
             <PiChatCenteredTextFill className="size-6" />
             </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog for Booking Slots */}
      <Dialog open={openDialog} handler={toggleDialog} className="fixed inset-0 flex h-[70vh] mt-28 items-center md:items-center justify-center ">
        <div className="w-full h-[65vh] bg-white px-2">
          {/* Close Icon */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <DialogHeader className="text-2xl font-semibold">New Appointment</DialogHeader>
              <p className="text-sm text-gray-500 pl-4">
                Choose an available schedule. Appointments can only be made this month.
              </p>
            </div>
            <button onClick={toggleDialog} className="text-gray-500 hover:text-gray-800 flex items-start pt-5 pr-2" aria-label="Close">
              <IoMdClose size={24} />
            </button>
          </div>

          <DialogBody>
            <div className="sm:ml-4 font-medium text-[#565656]">
              {/* Display Booking Year */}
              <p>
                Choose Day.{' '}
                {docSlots[slotIndex]?.[0]?.datetime
                  ? `${docSlots[slotIndex][0].datetime.toLocaleString('default', { month: 'long' })} ${docSlots[slotIndex][0].datetime.getFullYear()}`
                  : ''}
              </p>

              {/* Booking Days */}
              <div className="flex gap-3 items-center w-full overflow-x-scroll">
                {docSlots.map((slotGroup, index) => {
                  const date = slotGroup[0]?.datetime;
                  return (
                    <div
                      key={index}
                      onClick={() => setSlotIndex(index)}
                      className={`text-center py-6 min-w-20 rounded-3xl cursor-pointer ${
                        slotIndex === index ? 'bg-primary text-white font-bold' : 'border border-[#DDDDDD]'
                      }`}
                    >
                      <p>{date ? daysOfWeek[date.getDay()] : ''}</p>
                      <p>{date ? date.getDate() : ''}</p>
                    </div>
                  );
                })}
              </div>

              {/* Booking Time Slots */}
              <div className="mt-4">
                <p className="font-medium text-gray-600 mb-2">Choose Time Slot</p>

                <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                  {docSlots[slotIndex]?.map((slot, index) => (
                    <p
                      key={index}
                      onClick={() => setSlotTime(slot.time)}
                      className={`text-sm font-light flex-shrink-0 px-8 py-3 rounded-xl cursor-pointer ${
                        slot.time === slotTime ? 'bg-primary text-white font-bold' : 'text-[#949494] border border-[#B4B4B4]'
                      }`}
                    >
                      {slot.time.toLowerCase()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </DialogBody>

          <DialogFooter className="flex justify-center gap-4">
            <Button onClick={toggleDialog} className="bg-black">
              Cancel
            </Button>
            <Button onClick={bookAppointment} className="bg-primary">
              Confirm
            </Button>
          </DialogFooter>
        </div>
      </Dialog>
    </div>
  );
};

export default Appointment;
