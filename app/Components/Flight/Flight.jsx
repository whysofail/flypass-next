// Flight.js

import React from "react";

const Flight = ({ flight }) => {
  const {
    id,
    flightCode,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    duration,
    price,
    baggage,
    isAvailable,
    Airline,
    Airplane,
    FlightClass,
    FlightType,
    departureAirport,
    arrivalAirport,
  } = flight;

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);

  return (
    <div className="card  bg-base-100 shadow-xl py-2 px-12">
      <div className="card-body flex flex-row flex-wrap max-w-full justify-between">
        <div>
          <h2 className="card-title">{Airline.name}</h2>
          <div>
            <img
              src={Airline.image}
              alt={Airline.name}
              width={100}
              className="pt-4"
            />
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <div className="flex flex-col">
            <span className="font-bold">From</span>
            <span>
              <h4>{departureAirport.name}</h4>
              {departureDate} {departureTime}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">To</span>
            <span>
              <h4>{arrivalAirport.name}</h4>
              {arrivalDate} {arrivalTime}
            </span>
          </div>
        </div>
        <div>
          <div className="flex flex-row">
            <span className="font-bold">{formattedPrice}</span>
            <span>/pax</span>
          </div>

          <div class="card-actions pt-4 justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flight;
