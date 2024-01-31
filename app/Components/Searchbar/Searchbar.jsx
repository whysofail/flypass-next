"use client";
import React, { useState } from "react";

const Searchbar = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tripType, setTripType] = useState("oneWay");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [flightClass, setFlightClass] = useState("");

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  const handleSubmit = (event) => {};

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* From Dropdown */}
        <div>
          <label
            htmlFor="from"
            className="block text-sm font-medium text-gray-700"
          >
            From
          </label>
          <select
            id="from"
            name="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            {/* Replace with actual options */}
            <option value="city1">City 1</option>
            <option value="city2">City 2</option>
          </select>
        </div>

        {/* To Dropdown */}
        <div>
          <label
            htmlFor="to"
            className="block text-sm font-medium text-gray-700"
          >
            To
          </label>
          <select
            id="to"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            {/* Replace with actual options */}
            <option value="city1">City 1</option>
            <option value="city2">City 2</option>
          </select>
        </div>

        {/* Trip Type Dropdown */}
        <div>
          <label
            htmlFor="tripType"
            className="block text-sm font-medium text-gray-700"
          >
            Trip Type
          </label>
          <select
            id="tripType"
            name="tripType"
            value={tripType}
            onChange={handleTripTypeChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="oneWay">One Way</option>
            <option value="roundTrip">Round Trip</option>
          </select>
        </div>
      </div>

      {/* Departure Date */}
      <div className="mt-4">
        <label
          htmlFor="departureDate"
          className="block text-sm font-medium text-gray-700"
        >
          Departure Date
        </label>
        <input
          type="date"
          id="departureDate"
          name="departureDate"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Arrival Date (only for Round Trip) */}
      {tripType === "roundTrip" && (
        <div className="mt-4">
          <label
            htmlFor="arrivalDate"
            className="block text-sm font-medium text-gray-700"
          >
            Arrival Date
          </label>
          <input
            type="date"
            id="arrivalDate"
            name="arrivalDate"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      )}

      {/* Flight Class Dropdown */}
      <div className="mt-4">
        <label
          htmlFor="flightClass"
          className="block text-sm font-medium text-gray-700"
        >
          Flight Class
        </label>
        <select
          id="flightClass"
          name="flightClass"
          value={flightClass}
          onChange={(e) => setFlightClass(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          {/* Replace with actual options */}
          <option value="economy">Economy</option>
          <option value="business">Business</option>
        </select>
      </div>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
