import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [userData, setUserData] = useState({});

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadVehicleTypes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}captains/vehicle-types`,
        );
        if (!isMounted) return;
        const types = response.data?.vehicleTypes || [];
        setVehicleTypes(types);
        if (types.length > 0) {
          setVehicleType(types[0]);
        }
      } catch (err) {
        if (!isMounted) return;
        setVehicleTypes([]);
        setVehicleType("");
      }
    };

    loadVehicleTypes();
    return () => {
      isMounted = false;
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}captains/register`,
      newCaptain,
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType(vehicleTypes[0] || "");
  };
  return (
    <div>
      <div className="min-h-screen py-4 px-5 flex flex-col gap-4">
        <div className="flex-1">
          <img
            className="w-20"
            src="https://staging.svgrepo.com/show/505031/uber-driver.svg"
            alt="Uber Logo PNG"
          />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            action=""
            className="space-y-2"
          >
            <h3 className="text-lg font-medium">
              What's our Captain's name
            </h3>
            <div className="flex gap-3">
              <input
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base"
                type="text"
                name=""
                id=""
                required
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base"
                type="text"
                name=""
                id=""
                required
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <h3 className="text-lg font-medium">
              What's our Captain's email{" "}
            </h3>
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base"
              type="email"
              name=""
              id=""
              required
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3 className="text-lg font-medium">Enter Password</h3>
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 w-full text-lg placeholder:text-base"
              type="password"
              name=""
              id=""
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <h3 className="text-lg font-medium">Vehicle Information</h3>
            <div className="flex gap-3">
              <input
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-lg placeholder:text-base"
                type="text"
                name=""
                id=""
                required
                placeholder="Vehicle color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
                type="text"
                name=""
                id=""
                required
                placeholder="Plate number"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
            </div>
            <div className="flex gap-3 mb-3">
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base"
                type="number"
                name=""
                id=""
                required
                min="1"
                placeholder="Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
              <select
                required
                className="bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>
                  {vehicleTypes.length === 0
                    ? "Loading vehicle types..."
                    : "Select Vehicle Type"}
                </option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "two-wheeler"
                      ? "Two-wheeler"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg">
              Create Account
            </button>
          </form>
          <p className="text-center">
            Already have an account ?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[10px] leading-tight text-gray-600">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
