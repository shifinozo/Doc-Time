import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Chat from "./pages/Chat";
import Appointment from "./pages/Appointment";
import GettingStarted from "./pages/GettingStarted";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="dark:bg-gray-900 bg-[#fff]">
      <div className="mx-4 sm:mx-[10%]">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<GettingStarted />} />
          <Route element={<Layout />} path="/">
            <Route path="home" element={<Home />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/:speciality" element={<Doctors />} />
            <Route path="chat" element={<Chat />} />
            <Route path="login" element={<Login />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="my-appointments" element={<MyAppointments />} />
            <Route path="appointment/:docId" element={<Appointment />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
