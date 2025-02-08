import React, { useState, useRef, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Button, Avatar } from "@material-tailwind/react";
import CompanyInfo  from './CompanyInfo';
import { AppContext } from "../context/AppContext";

function BotDialog() {
  const { token, userData, setToken } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: CompanyInfo,
    },
  ]);
  const chatBodyRef = useRef();
  const inputRef = useRef();
  const userProfile =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"; // Add the user profile image URL here

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);
    } catch (error) {
      console.error(error);
      updateHistory("Oops! Too many requests. Please wait and try again.");
    }
  };

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(
      () =>
        setChatHistory((history) => [
          ...history,
          { role: "model", text: "Thinking..." },
        ]),
      600
    );

    generateBotResponse([
      ...chatHistory,
      {
        role: "user",
        text: `Using the details provided above, please this query:${userMessage}`,
      },
    ]);
  };

  const ChatMessage = ({ chat }) => (
    <div
      className={`flex items-center gap-1 pt-1 ${
        chat.role === "model" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {!chat.hideInChat && (
        <div
          className={`flex items-center gap-1 pt-2 ${
            chat.role === "model" ? "flex-row" : "flex-row-reverse"
          }`}
        >
          {chat.role === "model" && (
            <div className="w-10 h-10 flex items-center justify-center bg-[#0099ff] rounded-full">
              <img src={assets.Robot} alt="Robot Icon" className="w-10 h-10" />
            </div>
          )}
          {chat.role === "user" && (
            <div className="w-10 h-10 flex items-center justify-center">
              {token && userData ? (
                <Avatar
                  src={userData.image}
                  alt="avatar"
                  size="sm"
                  className="w-8 h-8"
                />
              ) : (
                <img
                  src={userProfile}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
              )}
            </div>
          )}

          <p
            className={`p-3 px-4 rounded-lg max-w-[75%] break-words ${
              chat.role === "model"
                ? "bg-gray-100 text-gray-800 rounded-bl-none "
                : "bg-[#0099ff] text-white rounded-br-none "
            }`}
          >
            {chat.text}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-full w-16 h-16 p-2 bg-gray-200 hover:bg-gray-300"
      >
        <img src={assets.Robot} alt="Robot Icon" className="w-10 h-10" />
      </Button>

      <Dialog
        open={open}
        handler={() => setOpen(!open)}
        className="bg-white rounded-lg shadow-md overflow-hidden absolute top-3"
      >
        <DialogHeader className="bg-[#0099ff] text-white flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white  rounded-full">
              <img src={assets.Robot} alt="Robot Icon" className="w-10 h-10" />
            </div>
            <h2 className="text-lg font-semibold">Chatbot</h2>
          </div>
          <IoIosArrowDown
            size={24}
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </DialogHeader>

        <DialogBody
          ref={chatBodyRef}
          className="flex-1 p-3 h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-[#0099ff] rounded-full">
              <img src={assets.Robot} alt="Robot Icon" className="w-10 h-10" />
            </div>
            <p className="p-3 bg-gray-100 text-gray-800 rounded-lg max-w-[75%] rounded-bl-none">
              Hello! How can I help you today?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </DialogBody>

        <DialogFooter className="p-3 bg-gray-100 flex justify-center items-center">
          <form
            className="flex items-center justify-between bg-white rounded-full shadow-md focus-within:ring focus-within:ring-[#0099ff] w-full max-w-md"
            onSubmit={handleFormSubmit}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Message..."
              className="flex-1 bg-transparent px-7 py-2 text-gray-700 outline-none"
              required
            />
            <button
              type="submit"
              className="w-10 h-10 flex items-center justify-center bg-[#0099ff] text-white rounded-full transition"
            >
              <IoIosArrowUp size={20} />
            </button>
          </form>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default BotDialog;
