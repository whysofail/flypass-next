"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ReactSelect from "./ReactSelect";

const Searchbar = () => {
  const router = useRouter();

  const [options, setOptions] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [tripType, setTripType] = useState("0");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightClass, setFlightClass] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const url = "http://localhost:5000/v1/airport";
        const response = await fetch(url);
        const data = await response.json();
        setOptions(data.airport);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const filteredOptions = options.filter((option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase()),
      );

      const transformedOptions = filteredOptions.map((option) => ({
        value: option.iata,
        label: `${option.name} (${option.iata}) - ${option.city}, ${option.country}`,
      }));

      callback(transformedOptions);
    }, 1000);
  };

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  const handleFormSubmit = () => {
    router.push(
      `/flight?depDate=${departureDate}&arrDate=${returnDate}&depAirport=${
        from ? from.value : from
      }&arrAirport=${to ? to.value : to}`,
    );
  };
  return (
    <div className="flex flex-col flex-wrap md:flex-row bg-slate-50 rounded-3xl shadow-xl py-4 px-8 border md:justify-evenly items-center">
      <div className="md:mr-4 mb-4 md:mb-0 w-52">
        <label htmlFor="from" className="block text-md font-medium text-black">
          From
        </label>
        <ReactSelect
          options={loadOptions}
          onChange={(selectedValue) => setFrom(selectedValue)}
          value={from}
          placeholder="Select an Airport"
        />
      </div>

      <div className="md:mr-4 mb-4 md:mb-0 w-52">
        <label htmlFor="from" className="block text-md font-medium text-black">
          To
        </label>
        <ReactSelect
          options={loadOptions}
          onChange={(selectedValue) => setTo(selectedValue)}
          value={to}
          placeholder="Select an Airport"
        />
      </div>

      {/* Trip Type Dropdown */}
      <div className="md:mr-4 mb-4 md:mb-0 max-w-60">
        <label
          htmlFor="tripType"
          className="block text-md font-medium text-black"
        >
          Trip Type
        </label>
        <select
          id="tripType"
          name="tripType"
          value={tripType}
          onChange={handleTripTypeChange}
          className=" p-[0.7rem] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
        >
          <option value="0" defaultValue="0" disabled>
            Select
          </option>
          <option value="oneWay">One Way</option>
          <option value="roundTrip">Round Trip</option>
        </select>
      </div>

      {/* Departure Date */}
      <div className="md:mr-4 mb-4 md:mb-0  ">
        <label
          htmlFor="departureDate"
          className="block text-md font-medium text-black"
        >
          Departure Date
        </label>
        <input
          type="date"
          id="departureDate"
          name="departureDate"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="w-36 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
        />
      </div>

      {/* Arrival Date (only for Round Trip) */}
      {tripType === "roundTrip" && (
        <div className="md:mr-4 mb-4 md:mb-0  ">
          <label
            htmlFor="arrivalDate"
            className="block text-md font-medium text-black"
          >
            Arrival Date
          </label>
          <input
            type="date"
            id="arrivalDate"
            name="arrivalDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-36 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
          />
        </div>
      )}

      {/* Flight Class Dropdown */}
      <div className="md:mr-4 mb-4 md:mb-0 ">
        <label
          htmlFor="flightClass"
          className="block text-md font-medium text-black"
        >
          Flight Class
        </label>
        <select
          id="flightClass"
          name="flightClass"
          value={flightClass}
          onChange={(e) => setFlightClass(e.target.value)}
          className=" p-[0.6rem] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
        >
          {/* Replace with actual options */}
          <option value="economy">Economy</option>
          <option value="business">Business</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="md:mr-4 mb-4 md:mb-0  max-w-60">
        <span className="">&nbsp;</span>
        <button
          onClick={handleFormSubmit}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
