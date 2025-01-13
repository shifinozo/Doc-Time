import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Input,
  Option,
  Select,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import User from "../../public/images/user1.png";
import Calendar from "../../public/images/calendar.png";
import Padlock from "../../public/images/padlock.png";
import Translate from "../../public/images/translate.png";
import Right from "../../public/images/right.png";
import Settings from '../../public/images/settingss.png';
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";

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
  const navigate = useNavigate();
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
      icon: (
        <img
          src={User}
          alt="User Icon"
          className="h-10 w-10 bg-[#eaf2ff] p-2 rounded-full border border-[#eaf2ff]"
        />
      ),
      onClick: () => setDialogOpen(true),
    },
    {
      label: "Appointment History",
      icon: (
        <img
          src={Calendar}
          alt="User Icon"
          className="h-10 w-10 bg-[#eaf2ff] p-2 rounded-full border border-[#eaf2ff]"
        />
      ),
      onClick: () => navigate("/my-appointments"),
    },

    {
      label: "Change Password",
      icon: (
        <img
          src={Padlock}
          alt="User Icon"
          className="h-10 w-10 bg-[#eaf2ff] p-2 rounded-full border border-[#eaf2ff]"
        />
      ),
      onClick: () => console.log("Change Password clicked"),
    },
    {
      label: "Change Language",
      icon: (
        <img
          src={Translate}
          alt="User Icon"
          className="h-10 w-10 bg-[#eaf2ff] p-2 rounded-full border border-[#eaf2ff]"
        />
      ),
      onClick: () => console.log("Change Language clicked"),
    },
    {
      label: "Settings",
      icon: (
        <img
          src={Settings}
          alt="User Icon"
          className="h-10 w-10 bg-[#eaf2ff] p-2 rounded-full border border-[#eaf2ff]"
        />
      ),
     
    },
  ];

  return userData ? (
    <div className="flex flex-col fixed items-center w-full   text-white min-h-screen  overflow-auto ">
      <div className="flex flex-col items-start pt-4">
        {/* Profile Header */}
        

        {/* Profile Image and Details */}
        <div className="flex items-center space-x-10 pt-10">
          {/* Profile Image */}
          <Avatar
            className="w-20 h-20 rounded-full"
            src={
              image
                ? URL.createObjectURL(image)
                : userData.image || "/default-avatar.png"
            }
          />

          {/* Profile Details */}
          <div>
            <div className="text-black font-bold text-2xl">
              <FieldInput value={userData.name} className="" />
            </div>
            <p className="text-gray-500 font-semibold text-lg">
              {userData.email}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}

      <div className="flex flex-col items-start gap-4 mt-10 pt-4 md:pl-20 pl-6 w-full min-h-screen overflow-auto rounded-t-2xl bg-white">
        <h1 className="text-black max-w-prose font-bold">Account Overview</h1>
        <List className="w-full md:w-[90%] bg-transparent">
          {buttons.map((button, index) => (
            <ListItem
              key={index}
              onClick={button.onClick}
              className="h-14 flex items-center justify-between px-6 hover:bg-gray-100 cursor-pointer"
            >
              <ListItemPrefix>
                <div className="flex items-center gap-4">
                  {button.icon}
                  <span className="text-black">{button.label}</span>
                </div>
              </ListItemPrefix>
              <ListItemSuffix>
                <img src={Right} alt="Right Arrow" className="h-6 w-6" />
              </ListItemSuffix>
            </ListItem>
          ))}
        </List>
      </div>
      {/* Dialog for My Profile */}
      <Dialog open={dialogOpen} handler={setDialogOpen} size="sm" className="max-h-[90vh]">
  <DialogHeader>User Profile Details</DialogHeader>
  <DialogBody divider className="max-h-[60vh] overflow-y-auto">
    <Avatar
      className="w-20 h-20 rounded-full mx-auto"
      src={image ? URL.createObjectURL(image) : userData.image || "/default-avatar.png"}
    />
    {isEdit && (
      <Input type="file" accept="image/*" className="mt-2" onChange={handleImageUpload} />
    )}
    <div className="flex flex-col gap-1">
    <FieldInput
        label="Phone"
        value={userData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        isEdit={isEdit}
      />
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
  <DialogFooter className="flex justify-between gap-2">
  <Button
    variant="gradient"
    color="blue"
    className="flex-1"
    onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
  >
    {isEdit ? "Save" : "Edit"}
  </Button>
  {isEdit && (
    <Button
      variant="gradient"
      color="red"
      className="flex-1"
      onClick={() => setIsEdit(false)}
    >
      Cancel
    </Button>
  )}
  <Button
    variant="gradient"
    color="gray"
    className={`flex-1 ${!isEdit ? "ml-2" : ""}`}
    onClick={() => setDialogOpen(false)}
  >
    Close
  </Button>
</DialogFooter>


</Dialog>
    </div>
    
  ) : null;
};

export default MyProfile;
