import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/captainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = { email: email, password: password };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}captains/login`,
      captain,
    );
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      navigate("/captain-home");
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20 mb-3"
          src="https://staging.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Logo PNG"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          action=""
        >
          <h3 className="text-lg font-medium mb-2">What's your email </h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="email"
            name=""
            id=""
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">What's your Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="password"
            name=""
            id=""
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg">
            Login
          </button>
        </form>
        <p className="text-center">
          Join a fleet ?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/user-login"
          className="flex items-center justify-center bg-[#fb8405] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg "
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
