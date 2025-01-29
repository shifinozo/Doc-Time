import React, { useContext } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { MdOutlineVideocam } from "react-icons/md";
import { AppContext } from "../../context/AppContext";
import { Avatar } from "@material-tailwind/react";
function DoctorMessage() {
  const { token, userData } = useContext(AppContext);
  return (
    <div className="">
      <div className="h-16 w-full bg-white border-b-4 border-gray-200 flex items-center justify-between">
        <div className="w-10 h-10 flex items-center justify-start ml-8 gap-4">
          {token && userData ? (
            <Avatar
              src={userData.image}
              alt="avatar"
              size="sm"
              className="w-8 h-8"
            />
          ) : null}
          <h1 className="text-2xl font-bold">{userData.name}</h1>
        </div>
        <div className="flex justify-end items-center gap-5 pr-10">
          <MdOutlineVideocam className="w-7 h-7" />
          <MdCall className="w-7 h-7" />
          <HiDotsVertical className="w-6 h-6 " />
        </div>
      </div>
    </div>
  );
}

export default DoctorMessage;
