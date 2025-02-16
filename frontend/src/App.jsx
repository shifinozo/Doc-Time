import React from "react";
import { Route, Routes, Navigate  } from "react-router-dom";
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
import Settings from "./pages/Settings";
import DoctorMessage from "./components/Chat/DoctorMessage";
import DocTimePro from "./components/DocTimePro";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="dark:bg-gray-900 bg-[#fff] ">
      <div className="">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<GettingStarted />} />
          <Route element={<Layout />} path="/">
            <Route path="home" element={<Home />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/:speciality" element={<Doctors />} />
            <Route path="chat" element={<Chat />} />
            <Route path="doctorMessage/:docId" element={<DoctorMessage/>} />
            <Route path="login" element={<Login />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />         
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="my-appointments" element={<MyAppointments />} />
            <Route path="appointment/:docId" element={<Appointment />} />
            <Route path="settings" element={<Settings />} />
            <Route path="subscription" element={<DocTimePro />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
            
          </Route>
        </Routes>
      </div>  
      </div>
  );
}

export default App;