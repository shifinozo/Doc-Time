import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialtyMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import BotDialog from "../components/BotDialog";

const Home = () => {
  return (
    <div className="dark:bg-gray-900 mx-4 md:mx-12 text-[#262626]">
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
      <Footer />
      
      {/* Bot Dialog */}
      <div className="fixed bottom-4 right-1 md:right-6">
        <BotDialog />
      </div>
    </div>
  );
};

export default Home;
