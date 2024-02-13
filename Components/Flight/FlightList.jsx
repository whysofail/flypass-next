// FlightList.js

import React from "react";
import Flight from "./Flight";
import FlightCard from "./FlightCard"; // Import your FlightCard component

const FlightList = ({ flights, onSetFlight, useCard }) => {
  return (
    <>
      {flights.length === 0 ? (
        <div>
          <div>No data found.</div>
        </div>
      ) : (
        flights.map((flight) => (
          <React.Fragment key={flight.id}>
            {useCard ? (
              <FlightCard flight={flight} key={flight.id} />
            ) : (
              <div className="py-4" key={flight.id}>
                <Flight flight={flight} onSetFlight={onSetFlight} />
              </div>
            )}
          </React.Fragment>
        ))
      )}
    </>
  );
};

export default FlightList;
