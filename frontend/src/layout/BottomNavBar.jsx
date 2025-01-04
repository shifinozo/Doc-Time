import { Button } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSearch, FaHeart, FaUser } from "react-icons/fa";
import { PiChatCenteredTextFill } from "react-icons/pi";

const navs = [
  { icon: FaHome, href: "/home" },
  { icon: PiChatCenteredTextFill, href: "/chat" },
  { icon: FaSearch, href: "/doctors" },
  { icon: FaHeart, href: "/my-appointments" },
  { icon: FaUser, href: "/my-profile" },
];

export default function BottomNavBar() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 flex w-[100%] -translate-x-1/2 justify-center gap-0 rounded-md bg-[#fff] p-2 shadow-lg border border-t-solid- border-opacity-100 border-t-[#d9e3ea]">
      {navs.map(({ icon: Icon, href }, i) => {
        const isActive = location.pathname === href;

        return (
          <Link
            to={href}
            key={i}
            className="flex flex-col items-center no-underline"
          >
            <Button
              className={`flex items-center justify-center rounded-full duration-200  ${
                href === "/doctors"
                  ? "bg-primary text-white hover:bg-primary mt-[-5px]" // Always applies to `/doctors`
                  : isActive
                  ? "text-primary " // Applies to other active links
                  : "bg-transparent text-black " // Inactive state
              }`}
              variant="text"
            >
              <Icon className="text-2xl" /> {/* Adjusted for better fit */}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
