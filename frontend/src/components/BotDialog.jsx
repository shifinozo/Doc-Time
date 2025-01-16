import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { assets } from '../assets/assets'
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";

function BotDialog() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleDialog = () => setOpen((prev) => !prev);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { text: input, sender: "user" }]);
      setInput("");
      // Simulating a bot response after sending user message
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Hey there! How can I help?", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Trigger Button */}
      <Button
        onClick={toggleDialog}
        className="flex items-center justify-center rounded-full w-16 h-16 p-2 bg-gray-200 hover:bg-gray-300"
      >
        <img src={assets.Robot} alt="Robot Icon" className="w-10 h-10" />
      </Button>

      {/* Dialog */}
      <Dialog
        open={open}
        handler={toggleDialog}
        className="fixed top-10 bg-white rounded-lg shadow-md"
      >
        <div className="flex flex-col h-[80vh] max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <img src={assets.Robot} alt="Robot Icon" className="w-10 h-10" />
            <DialogHeader className="text-xl text-gray-700 font-semibold">
              DocTime ChatBot
            </DialogHeader>
            <MdOutlineKeyboardDoubleArrowDown
              onClick={toggleDialog}
              className="text-gray-500 w-6 h-6 cursor-pointer"
            />
          </div>

          {/* Dialog Body */}
          <DialogBody className="flex-1 px-4 py-5 text-gray-600 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender !== "user" && (
                  <div className="chat-image avatar">
                    <div className="w-10 h-10 rounded-full">
                      <img
                        alt="Bot avatar"
                        src={assets.Robot}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                )}
                <div
                  className={`md:px-10 md:py-2 px-8 py-1 rounded-tl-[13px] rounded-tr-[13px] rounded-bl-[3px] rounded-br-[13px] max-w-xs ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-black text-white"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="chat-image avatar">
                    <div className="w-10 h-10 rounded-full">
                      <img
                        alt="User avatar"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        className="rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </DialogBody>

          {/* Dialog Footer */}
          <DialogFooter className="px-4 py-2 flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-500 pr-10"
              />
              <button
                onClick={sendMessage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-400 text-white flex items-center justify-center rounded-full hover:bg-gray-800"
              >
                <FaArrowUp className="w-4 h-4" />
              </button>
            </div>
          </DialogFooter>
        </div>
      </Dialog>
    </div>
  );
}

export default BotDialog;
