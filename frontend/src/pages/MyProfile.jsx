import React, { useContext, useState, useMemo } from "react";
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
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";
import User from "../../public/images/user1.png";
import Calendar from "../../public/images/calendar.png";
import Right from "../../public/images/right.png";
import Settings from "../../public/images/settingss.png";

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

  // Memoize avatar URL to avoid unnecessary re-computation
  const avatarUrl = useMemo(
    () =>
      image
        ? URL.createObjectURL(image)
        : userData?.image || "/default-avatar.png",
    [image, userData?.image]
  );

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
      icon: <IconWrapper src={User} />,
      onClick: () => setDialogOpen(true),
    },
    {
      label: "Appointment History",
      icon: <IconWrapper src={Calendar} />,
      onClick: () => navigate("/my-appointments"),
    },
    
    {
      label: "Settings",
      icon: <IconWrapper src={Settings} />,
      onClick: () => navigate("/settings"),
    },
  ];

  return userData ? (
    <div className="flex flex-col items-center w-full text-white min-h-screen overflow-auto">
      {/* Profile Header */}
      <div className="flex items-center space-x-10 pt-10">
        <Avatar className="w-20 h-20 rounded-full" src={avatarUrl} />
        <div>
          <h2 className="text-black font-bold text-2xl">{userData.name}</h2>
          <p className="text-gray-500 font-semibold text-lg">{userData.email}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 mt-10 w-full bg-white rounded-t-2xl">
        <h1 className="text-black font-bold text-lg px-6">Account Overview</h1>
        <List className="w-full px-6">
          {buttons.map((button, index) => (
            <ListItem
              key={index}
              onClick={button.onClick}
              className="h-14 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
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

      {/* Profile Dialog */}
      <Dialog
        open={dialogOpen}
        handler={setDialogOpen}
        size="sm"
        className="max-h-[90vh]"
      >
        <DialogHeader>User Profile Details</DialogHeader>
        <DialogBody divider className="max-h-[60vh] overflow-y-auto">
          <Avatar className="w-20 h-20 mx-auto" src={avatarUrl} />
          {isEdit && (
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          )}
          <div className="flex flex-col gap-2 mt-4">
            <FieldInput
              label="Name"
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
        <DialogFooter className="flex justify-between">
          <Button
            variant="gradient"
            color="blue"
            onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
          >
            {isEdit ? "Save" : "Edit"}
          </Button>
          {isEdit && (
            <Button variant="gradient" color="red" onClick={() => setIsEdit(false)}>
              Cancel
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

const IconWrapper = ({ src }) => (
  <img
    src={src}
    alt="Icon"
    className="h-10 w-10 bg-[#eaf2ff] p-2 rounded-full border border-[#eaf2ff]"
  />
);

export default MyProfile;
