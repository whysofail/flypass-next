// FlightList.js

import React from "react";
import Flight from "./Flight";

const FlightList = ({ flights }) => {
  console.log(flights.length);
  return (
    <>
      {flights.length === 0 ? (
        <div>
          <div>No data found.</div>
        </div>
      ) : (
        flights.map((flight) => <Flight key={flight.id} flight={flight} />)
      )}
    </>
  );
};

export default FlightList;
