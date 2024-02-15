"use client";
import { useEffect, useState } from "react";
import useDataFetching from "../../../Hooks/useDataFetching";
import ReactSelect from "../../Searchbar/ReactSelect";
import axios from "axios";

const FlightForm = ({ flight, authToken }) => {
  const [formData, setFormData] = useState({
    flightCode: flight.flightCode,
    airlineId: flight.Airline?.id,
    airlineName: flight.Airline?.name,
    departureAirportId: flight?.departureAirport.id,
    arrivalAirportId: flight.arrivalAirport.id,
    departureDate: flight.departureDate,
    departureTime: flight.departureTime,
    arrivalDate: flight.arrivalDate,
    arrivalTime: flight.arrivalTime,
    price: flight.price,
    flightClassId: flight.flightClassId,
    baggage: flight.baggage,
    isAvailable: flight.isAvailable,
  });
  const baseURL = `http://localhost:5000/v1`;
  const [airline, setAirlines] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
          const airlines = await fetch(`${baseURL}/airlines`)
          const data = await airlines.json()
          setAirlines(data)
        } catch (error) {
          console.error(error)
        }
    };
    fetchData()
  },[]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${baseURL}/flights/${flight.id}`, // Corrected: Used flight.id instead of id
        qs.stringify(formData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer <your_token>",
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filterAirlines = (inputValue) => {
    return airline.airlines.filter((i) =>
      i.name.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const loadOptionsAirlines = generateLoadOptions(filterAirlines);

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input
          type="text"
          name="flightCode"
          value={formData.flightCode}
          onChange={handleChange}
          className="input"
          placeholder="Flight Code"
        />
        <ReactSelect
          options={loadOptionsAirlines}
          defaultValue={formData.airlineName}
          defaultOptions
          onChange={(selectedValue) =>
            setFormData({ ...formData, airlineId: selectedValue.value })
          }
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FlightForm;

const generateLoadOptions = (filterFunction) => {
  return (inputValue, callback) => {
    setTimeout(() => {
      const filteredOptions = filterFunction(inputValue);

      const transformedOptions = filteredOptions.map((option) => ({
        value: option.id, // Assuming id is the correct identifier for airlineId
        label: option.name,
      }));

      callback(transformedOptions);
    }, 1000);
  };
};
