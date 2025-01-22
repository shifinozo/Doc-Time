import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  Switch,
} from "@material-tailwind/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  MdOutlineLightMode,
  MdSunny,
  MdOutlineShare,
  MdOutlineEmail,
  MdOutlineFeedback,
  MdOutlineLock,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegStar, FaArrowLeft, FaRegFile } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

function Settings() {
  const [isLightMode, setIsLightMode] = useState(false);
  const toggleLightMode = () => setIsLightMode((prev) => !prev);

  const IconWrapper = ({ children }) => (
    <div className="bg-[#eaf2ff] p-2 rounded-full text-black flex items-center justify-center">
      {children}
    </div>
  );

  return (
    <div className="p-4 h-min-screen ">
      {/* Header */}
      <div className="flex items-center gap-5 mb-6">
        <Link to="/my-profile">
          <button aria-label="Go back" className="text-xl">
            <FaArrowLeft />
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Material Tailwind List */}
      <div className="flex justify-center">

      <div className="bg-white rounded-lg shadow-md p-4 md:w-[50%] w-full">
        <List>
          <ListItem className="flex justify-between items-center">
            <div className="flex items-center font-bold">
              <ListItemPrefix>
                <IconWrapper>
                  <IoMdNotificationsOutline className="text-2xl" />
                </IconWrapper>
              </ListItemPrefix>
              Notifications
            </div>
            <Switch color="light-blue" />
          </ListItem>

          <ListItem className="flex justify-between items-center">
            <div className="flex items-center font-bold">
              <ListItemPrefix>
                <IconWrapper>
                  {isLightMode ? (
                    <MdSunny className="text-2xl" />
                  ) : (
                    <MdOutlineLightMode className="text-2xl" />
                  )}
                </IconWrapper>
              </ListItemPrefix>
              {isLightMode ? "Dark Mode" : "Light Mode"}
            </div>
            <Switch
              color="light-blue"
              checked={isLightMode}
              onChange={toggleLightMode}
            />
          </ListItem>

          <ListItem className="font-bold">
            <ListItemPrefix>
              <IconWrapper>
                <FaRegStar className="text-2xl" />
              </IconWrapper>
            </ListItemPrefix>
            Rate Us
          </ListItem>

          <ListItem className="font-bold">
            <ListItemPrefix>
              <IconWrapper>
                <MdOutlineShare className="text-2xl" />
              </IconWrapper>
            </ListItemPrefix>
            Share App
          </ListItem>

          <ListItem className="font-bold">
            <ListItemPrefix>
              <IconWrapper>
                <MdOutlineLock className="text-2xl" />
              </IconWrapper>
            </ListItemPrefix>
            Privacy Policy
          </ListItem>

          <ListItem className="font-bold">
            <ListItemPrefix>
              <IconWrapper>
                <FaRegFile className="text-2xl" />
              </IconWrapper>
            </ListItemPrefix>
            Terms and Conditions
          </ListItem>

          <ListItem className="font-bold">
            <ListItemPrefix>
              <IconWrapper>
                <MdOutlineEmail className="text-2xl" />
              </IconWrapper>
            </ListItemPrefix>
            Contact Us
          </ListItem>

          <ListItem className="font-bold">
            <ListItemPrefix>
              <IconWrapper>
                <MdOutlineFeedback className="text-2xl" />
              </IconWrapper>
            </ListItemPrefix>
            Feedback
          </ListItem>

          <ListItem className="font-bold">
            <ListItemPrefix>
              <IconWrapper>
                <MdLogout className="text-2xl" />
              </IconWrapper>
            </ListItemPrefix>
            Logout
          </ListItem>
        </List>
      </div>
      </div>

    </div>
  );
}

export default Settings;
