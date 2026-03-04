import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="p-1 text-center w-[93%] top-0 absolute "
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
        }}
        className="flex rounded-xl border-2 border-transparent active:border-black mb-2 w-full p-3 items-center justify-between"
      >
        <img
          className="h-12"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600 ">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹193.20</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
        }}
        className="flex border-2 border-transparent active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="h-12 ml-4 mr-4"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600 ">
            Affordable, motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹65.00</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
        }}
        className="flex border-2 border-transparent active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
      >
        <img
          className="ml-2 mr-2 h-12"
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600 ">
            Affordable, rickshaw rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹118.86</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
