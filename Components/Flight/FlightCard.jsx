// FlightCard.js

import React from "react";

const FlightCard = ({ flight }) => {
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
    <div className="card w-full h-fit bg-base-100 border border-slate-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Flight Information</h2>
        <h3 className="font-semibold">
          {departureAirport.iata} - {arrivalAirport.iata}
        </h3>
        <p>
          <strong>Departure:</strong> {departureDate} {departureTime}
        </p>
        <p>
          <strong>Arrival:</strong> {arrivalDate} {arrivalTime}
        </p>
        <p>
          <strong>Baggage:</strong> {baggage} kg
        </p>
        <p>
          <strong>Price:</strong> {formattedPrice}
        </p>
        {/* Add more details if needed */}
      </div>
      {/* You can customize the image or remove it based on your design */}
      <figure>
        <img src={Airline.image} width={200} className="p-4" alt="Flight" />
      </figure>
    </div>
  );
};

export default FlightCard;
