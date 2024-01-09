import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiBaseUrl, toastConfig } from "../config";
import { AuthContext } from "./AuthProvider";

const AuthForm = ({ isLoginPage }) => {
  const { setUserId } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCtaSubtext = () => {
    isLoginPage ? navigate("/register") : navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userId = "";
      if (isLoginPage) {
        const { data } = await axios.post(apiBaseUrl + "user/login", formData);
        userId = data.userId;
        toast.success("Logged In Successfully", toastConfig);
      } else {
        const { data } = await axios.post(
          apiBaseUrl + "user/register",
          formData
        );
        userId = data.userId;
        toast.success("Yay!! You're registerd", toastConfig);
      }
      sessionStorage.setItem("user-id", userId);
      setUserId(userId);
      setFormData({ fullName: "", email: "", password: "" });
    } catch (error) {
      toast.error("Something went wrong!! Please try again");
    }
  };

  return (
    <>
      <div className="mt-10 text-center">
        <h2 className="text-3xl">Welcome to HabitHub</h2>
        <p>Your Daily Habits, Your Journey</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
        <h2 className="text-2xl mb-4">{isLoginPage ? "Login" : "Register"}</h2>
        {!isLoginPage && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-md font-bold"
        >
          {isLoginPage ? "Login" : "Start Your Journey"}
        </button>

        <p
          className="text-sm text-center pt-2 cursor-pointer hover:underline mb-10"
          onClick={handleCtaSubtext}
        >
          {isLoginPage
            ? "Don't have account? Click here to register"
            : "Already a member? Log in to continue your habit-building journey."}
        </p>
      </form>
      <ToastContainer />
    </>
  );
};

export default AuthForm;
