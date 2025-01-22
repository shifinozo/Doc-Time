import React from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  Switch,
} from "@material-tailwind/react";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineLightMode } from "react-icons/md";
import { FaRegStar, FaArrowLeft } from "react-icons/fa";
import { MdOutlineShare } from "react-icons/md";
import { FaRegFile } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineFeedback } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { MdSunny } from "react-icons/md";
function Settings() {
  const [isLightMode, setIsLightMode] = useState(false);
  const toggleLightMode = () => setIsLightMode((prev) => !prev);
  return (
    <div className="p-4 h-min-screen">
      {/* Header */}
      <div className="flex items-center gap-5 mb-6">
        <button aria-label="Go back" className="text-xl">
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Material Tailwind List */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <List>
          <ListItem className="flex justify-between items-center">
            <div className="flex items-center">
              <ListItemPrefix>
                <IoMdNotificationsOutline className="text-2xl" />
              </ListItemPrefix>
              Notifications
            </div>
            <Switch color="light-blue" />
          </ListItem>
          <ListItem className="flex justify-between items-center">
            <div className="flex items-center">
              <ListItemPrefix>
                {isLightMode ? (
                  <MdSunny className="text-2xl" />
                ) : (
                  <MdOutlineLightMode className="text-2xl" />
                )}
              </ListItemPrefix>
              {isLightMode ? "Dark Mode" : "Light Mode"}
            </div>
            <Switch
              color="light-blue"
              checked={isLightMode}
              onChange={toggleLightMode}
            />
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <FaRegStar className=" text-2xl" />
            </ListItemPrefix>
            Rate Us
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineShare className=" text-2xl" />
            </ListItemPrefix>
            Share App
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineLock className=" text-2xl" />
            </ListItemPrefix>
            Privacy Policy
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <FaRegFile className=" text-2xl" />
            </ListItemPrefix>
            Terms and Conditions
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineEmail className=" text-2xl" />
            </ListItemPrefix>
            Contact Us
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineFeedback className=" text-2xl" />
            </ListItemPrefix>
            Feedback
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdLogout className=" text-2xl" />
            </ListItemPrefix>
            Logout
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Settings;
