import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ email: email, password: password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://www.pngall.com/wp-content/uploads/13/Uber-Logo-PNG-File.png"
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
          New here ?{" "}
          <Link to="/user-signup" className="text-blue-600">
            Create New Account
          </Link>
        </p>
      </div>
      <div>
        <Link to="/captain-login" className="flex items-center justify-center bg-[#43a914] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg ">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
