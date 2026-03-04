import React from "react";

const LocationSearchPanel = (props) => {
  //sample array of locations
  const locations = [
    "4/2E Chamru Khansama Lane, Parkcircus, Kolkata 700017, West Bengal",
    "4/2C Chamru Khansama Lane, Parkcircus, Kolkata 700017, West Bengal",
    "4/2I Chamru Khansama Lane, Parkcircus, Kolkata 700017, West Bengal",
    "4/2B Chamru Khansama Lane, Parkcircus, Kolkata 700017, West Bengal",
    "4/2A Chamru Khansama Lane, Parkcircus, Kolkata 700017, West Bengal",
  ];
  return (
    <div>
      {/* THIS IS JUST A SAMPLE DATA */}

      {locations.map((location, index) => {
        return (
          <div
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
              
            }}
            key={index}
            className="flex gap-3 border-2 border-white p-2 rounded-xl active:border-black my-2 items-center justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
