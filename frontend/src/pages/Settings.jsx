import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineLightMode } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineShare } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaRegFile } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineFeedback } from "react-icons/md";
import { MdLogout } from "react-icons/md";
function Settings() {
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-10 mb-6">
        <button aria-label="Go back" className="text-xl">
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Material Tailwind List */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <List>
          <ListItem>
            <ListItemPrefix>
              <IoMdNotificationsOutline className="text-blue-500 text-2xl" />
            </ListItemPrefix>
            Notifications
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineLightMode className="text-green-500 text-2xl" />
            </ListItemPrefix>
            Theme
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <FaRegStar className="text-red-500 text-2xl" />
            </ListItemPrefix>
            Rate Us
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineShare className="text-red-500 text-2xl" />
            </ListItemPrefix>
            Share App
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <CiLock className="text-red-500 text-2xl" />
            </ListItemPrefix>
            Privacy Policy
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              < FaRegFile className="text-red-500 text-2xl" />
            </ListItemPrefix>
            Terms and Conditions
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineEmail className="text-red-500 text-2xl" />
            </ListItemPrefix>
            Contact Us
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdOutlineFeedback className="text-red-500 text-2xl" />
            </ListItemPrefix>
            Feedback
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MdLogout className="text-red-500 text-2xl" />
            </ListItemPrefix>
            Logout
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Settings;
