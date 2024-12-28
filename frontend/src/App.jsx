import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import GettingStarted from "./pages/GettingStarted";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="dark:bg-gray-900">
      <div className="mx-4 sm:mx-[10%]">
        <ToastContainer />
        <Routes>
          <Route path="/Doc-Time/" element={<GettingStarted />} />
          <Route path="/Doc-Time/home" element={<Home />} />
          <Route path="/Doc-Time/doctors" element={<Doctors />} />
          <Route path="/Doc-Time/doctors/:speciality" element={<Doctors />} />
          <Route path="/Doc-Time/login" element={<Login />} />
          <Route path="/Doc-Time/about" element={<About />} />
          <Route path="/Doc-Time/contact" element={<Contact />} />
          <Route path="/Doc-Time/my-profile" element={<MyProile />} />
          <Route path="/Doc-Time/my-appointments" element={<MyAppointments />} />
          <Route path="/Doc-Time/appointment/:docId" element={<Appointment />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
