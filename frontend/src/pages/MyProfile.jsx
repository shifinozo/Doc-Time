import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  Input,
  Tooltip,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  IoMdSettings,
  IoIosShareAlt
} from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import User from '../../public/images/user1.png'
import Calendar from '../../public/images/calendar.png'
import Padlock from '../../public/images/padlock.png'
import Translate from '../../public/images/translate.png'
import Right from '../../public/images/right.png'
// Reusable Input Component
const FieldInput = ({ label, value, onChange, type = "text", isEdit }) => (
  <div className="flex flex-col gap-2">
    <label className="text-gray-700 font-medium">{label}</label>
    {isEdit ? (
      type === "select" ? (
        <Select value={value} onChange={onChange}>
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Other">Other</Option>
        </Select>
      ) : (
        <Input type={type} value={value || ""} onChange={onChange} />
      )
    ) : (
      <p className="text-gray-700">{value || "Not Provided"}</p>
    )}
  </div>
);

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  // Update user profile data
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone || "");
      formData.append("gender", userData.gender || "");
      formData.append("address", JSON.stringify(userData.address || {}));
      formData.append("dob", userData.dob || "");

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  // Configuration for action buttons
  const buttons = [
    {
      label: "My Profile",
      icon: <img src={User} alt="User Icon" className="h-10 w-10 bg-[#eaf2ff] p-2 rounded-full border border-[#eaf2ff]" />,
      onClick: () => setDialogOpen(true),
    },
    {
      label: "Appointment History",
      icon: <img src={Calendar} alt="User Icon" className="h-10 w-10 bg-[#eaf2ff] p-2 rounded-full border border-[#eaf2ff]" />,
      onClick: () => console.log("Appointment History clicked"),
    },
    
    {
      label: "Change Password",
      icon: <img src={Padlock} alt="User Icon" className="h-10 w-10 bg-[#eaf2ff] p-2 rounded-full border border-[#eaf2ff]" />,
      onClick: () => console.log("Change Password clicked"),
    },
    {
      label: "Change Language",
      icon: <img src={Translate} alt="User Icon" className="h-10 w-10 bg-[#eaf2ff] p-2 rounded-full border border-[#eaf2ff]" />,
      onClick: () => console.log("Change Language clicked"),
    },
   
  ];

  return userData ? (
    <div className="flex flex-col fixed items-center w-full  text-white min-h-screen overflow-auto bg-[#eaf2ff] ">
      {/* Profile Header */}
      <div className="relative flex flex-col items-center pt-10 rounded-3xl w-full h-40">
        <div className="absolute top-4 right-4 flex gap-4">
          <Tooltip content="Share Profile">
            <button className="text-2xl text-black hover:text-gray-600">
              <IoIosShareAlt />
            </button>
          </Tooltip>
          <Tooltip content="Settings">
            <button className="text-2xl text-black hover:text-gray-600">
              <IoMdSettings />
            </button>
          </Tooltip>
        </div>
        <Avatar
          className="w-28 h-28 rounded-full"
          src={image ? URL.createObjectURL(image) : userData.image || "/default-avatar.png"}
        />
       
        <div className="text-center pt-2">
          <FieldInput
            value={userData.name}
            
          />
        </div>
        <p className="flex items-center text-black mt-2">
         <span className="ml-2 text-gray-700">{userData.email}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-start gap-4 mt-20 pt-4 md:pl-20 pl-6 w-full min-h-screen overflow-auto rounded-t-2xl bg-white">
        <h1 className="text-black max-w-prose font-bold">Account Overview</h1>
        {buttons.map((button, index) => (
          <Button
            key={index}
            fullWidth
            className="bg-transparent h-14 w-80 md:h-14 md:w-[40%] flex items-center justify-between px-6"
            onClick={button.onClick}
          >
            <div className="flex items-center gap-4">
              {button.icon}
              <span className="text-primary">{button.label}</span>
            </div>
            <img src={Right} alt="Right Arrow" className="h-6 w-6" /> 
          </Button>
        ))}
      </div>

      {/* Dialog for My Profile */}
      <Dialog open={dialogOpen} handler={setDialogOpen}>
        <DialogHeader>User Profile Details</DialogHeader>
        <DialogBody divider>
          <Avatar
            className="w-28 h-28 rounded-full"
            src={image ? URL.createObjectURL(image) : userData.image || "/default-avatar.png"}
          />
          {isEdit && (
            <Input type="file" accept="image/*" className="mt-2" onChange={handleImageUpload} />
          )}
          <div className="flex flex-col gap-4">
            <FieldInput
              label="Phone"
              value={userData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              isEdit={isEdit}
            />
            <FieldInput
              label="Gender"
              value={userData.gender}
              onChange={(value) => handleInputChange("gender", value)}
              type="select"
              isEdit={isEdit}
            />
            <FieldInput
              label="Address"
              value={userData.address?.street}
              onChange={(e) => handleInputChange("address.street", e.target.value)}
              isEdit={isEdit}
            />
            <FieldInput
              label="Date of Birth"
              value={userData.dob}
              onChange={(e) => handleInputChange("dob", e.target.value)}
              type="date"
              isEdit={isEdit}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          {isEdit ? (
            <>
              <Button variant="gradient" color="blue" onClick={updateUserProfileData}>
                Save
              </Button>
              <Button variant="gradient" color="red" onClick={() => setIsEdit(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="gradient" color="blue" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          )}
          <Button variant="gradient" color="gray" onClick={() => setDialogOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  ) : null;
};

export default MyProfile;
