import Doc404 from '../../public/images/Doc404.png';
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">404 Error</h1>
        <p className="text-xl text-gray-600">Oops! The doctor is not around.</p>
        <p className="text-md text-gray-500 mt-2">
          We tried but couldn't find the page you're looking for. We'll do better next time.
        </p>
      </div>
       {/* Navigation Button */}
       <Link to="/">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg">
          Back to Home
        </Button>
      </Link>

      {/* Image Section */}
      <img
        src={Doc404}
        alt="Document Not Found"
        className="w-4/5 max-w-md md:max-w-lg lg:max-w-2xl object-contain "
      />

     
    </div>
  );
}

export default NotFound;
