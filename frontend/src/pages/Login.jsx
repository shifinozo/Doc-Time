import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formState, setFormState] = useState("Sign Up"); // Renamed for clarity
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  }); // Consolidated state
  const { name, email, password } = formData;

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  // Handle input changes for a dynamic form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const endpoint =
      formState === "Sign Up" ? "/api/user/register" : "/api/user/login";

    const payload =
      formState === "Sign Up" ? { name, email, password } : { email, password };

    try {
      const { data } = await axios.post(backendUrl + endpoint, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Success!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);

  const socialIcons = [
    { src: assets.Google, alt: "Google" },
    { src: assets.FaceBook, alt: "Facebook" },
    { src: assets.Apple, alt: "Apple" },
  ];

  return (
    <Card color="transparent" shadow={false} className="p-6 max-w-sm mx-auto">
      <Typography variant="h3" className="text-center font-bold text-primary">
        {formState === "Sign Up" ? "Create Account" : "Login"}
      </Typography>
      <Typography className="mt-1 text-sm text-center font-normal text-gray-700">
        {formState === "Sign Up"
          ? "Nice to meet you! Enter your details to register."
          : "Welcome back! Please log in to continue."}
      </Typography>
      <form className="mt-6 space-y-6" onSubmit={onSubmitHandler}>
        {formState === "Sign Up" && (
          <Input
            label="Full Name"
            size="lg"
            name="name"
            value={name}
            onChange={handleInputChange}
            required
          />
        )}
        <Input
          label="Email"
          size="lg"
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <Input
          type={showPassword ? "text" : "password"}
          label="Password"
          size="lg"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
          icon={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          }
        />

        {formState === "Sign Up" && (
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
          />
        )}
        <Button className="bg-primary" type="submit" fullWidth>
          {formState === "Sign Up" ? "Create Account" : "Login"}
        </Button>
        <div className="flex flex-col items-center mt-4 space-y-4">
          <div className="flex items-center justify-center space-x-8">
            {socialIcons.map(({ src, alt }) => (
              <div
                key={alt}
                className="rounded-full bg-[#ebf1f4] p-2 flex items-center justify-center w-10 h-10"
              >
                <img src={src} alt={alt} className="w-5 h-5" />
              </div>
            ))}
          </div>
          <Typography className="text-center text-sm text-gray-700">
            By logging in, you agree to our{" "}
            <span className="text-black font-bold">Terms & Conditions</span> and{" "}
            <span className="text-black font-bold">Privacy Policy</span>.
          </Typography>
        </div>
      </form>
      <Typography color="gray" className="mt-4 text-center font-normal">
        {formState === "Sign Up" ? (
          <>
            Already have an account?{" "}
            <span
              onClick={() => setFormState("Login")}
              className="text-primary font-medium cursor-pointer"
            >
              Login here
            </span>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <span
              onClick={() => setFormState("Sign Up")}
              className="text-primary font-medium cursor-pointer"
            >
              Sign up here
            </span>
          </>
        )}
      </Typography>
    </Card>
  );
};

export default Login;
