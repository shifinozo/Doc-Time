import React, { useState, useContext } from "react";
import { List, ListItem, ListItemPrefix, Switch } from "@material-tailwind/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineLightMode, MdSunny, MdOutlineShare, MdOutlineEmail, MdOutlineFeedback, MdOutlineLock } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegStar, FaArrowLeft, FaRegFile } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { token, setToken } = useContext(AppContext);
  const [isLightMode, setIsLightMode] = useState(false);
  const navigate = useNavigate();

  const toggleLightMode = () => setIsLightMode((prev) => !prev);

  const IconWrapper = ({ children }) => (
    <div className="bg-[#eaf2ff] p-2 rounded-full text-black flex items-center justify-center">
      {children}
    </div>
  );

  const logout = () => {
    localStorage.clear(); // Clear all user data
    setToken(false);
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="p-4 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-5 mb-6">
        <Link to="/my-profile">
          <button aria-label="Go back" className="text-xl">
            <FaArrowLeft />
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Settings List */}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-md p-4 md:w-[50%] w-full">
          <List>
            <ListItem className="flex justify-between items-center cursor-pointer">
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

            <ListItem className="flex justify-between items-center cursor-pointer">
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
                {isLightMode ? "Light Mode" : "Dark Mode"}
              </div>
              <Switch color="light-blue" checked={isLightMode} onChange={toggleLightMode} />
            </ListItem>

            {[
              { icon: <FaRegStar />, label: "Rate Us" },
              { icon: <MdOutlineShare />, label: "Share App" },
              { icon: <MdOutlineLock />, label: "Privacy Policy" },
              { icon: <FaRegFile />, label: "Terms and Conditions" },
              { icon: <MdOutlineEmail />, label: "Contact Us" },
              { icon: <MdOutlineFeedback />, label: "Feedback" }
            ].map((item, index) => (
              <ListItem key={index} className="font-bold cursor-pointer">
                <ListItemPrefix>
                  <IconWrapper>{item.icon}</IconWrapper>
                </ListItemPrefix>
                {item.label}
              </ListItem>
            ))}

            <ListItem className="font-bold cursor-pointer" onClick={logout}>
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
