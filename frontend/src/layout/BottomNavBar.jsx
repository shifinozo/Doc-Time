import { Button } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaHeart, FaUser } from "react-icons/fa";

const navs = [
  { icon: FaHome, label: "Home", href: "/home" },
  { icon: FaSearch, label: "Doctors", href: "/doctors" },
  { icon: FaHeart, label: "Appointments", href: "/my-appointments" },
  { icon: FaUser, label: "Profile", href: "/my-profile" },
];

export default function BottomNavBar() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 flex w-[100%] -translate-x-1/2 justify-between gap-4 rounded-md bg-white p-4 shadow-lg md:hidden ">
      {navs.map(({ icon: Icon, label, href }, i) => {
        const isActive = location.pathname === href;

        return (
          <Link to={href} key={i} className="flex flex-col items-center no-underline">
            <Button
              className={`flex items-center justify-center rounded-full duration-200 ${
                isActive ? "bg-primary text-white" : "bg-transparent text-black"
              }`}
              variant="text"
              size="lg"
            >
              <Icon className="text-2xl" />
            </Button>
            <span
              className={`mt-1 text-xs font-medium ${
                isActive ? "text-primary" : "text-gray-500"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
