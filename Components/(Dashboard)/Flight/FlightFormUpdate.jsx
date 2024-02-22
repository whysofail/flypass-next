"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../../../Helper/fetch";
import ReactSelect from "../../Searchbar/ReactSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const FlightFormUpdate = ({ flight, authToken }) => {
  const [formData, setFormData] = useState({
    flightCode: flight.flightCode,
    airlineId: flight.Airline?.id,
    airlineName: flight.Airline?.name,
    departureAirportId: flight?.departureAirport.id,
    arrivalAirportId: flight.arrivalAirport.id,
    departureAirportName: flight.departureAirport.name,
    arrivalAirportName: flight.arrivalAirport.name,
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
  const [departureAirport, setDepartureAirport] = useState([]);
  const [arrivalAirport, setArrivalAirport] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const airlines = await fetchData(`${baseURL}/airlines`, "GET");
        const airports = await fetchData(`${baseURL}/airport`, "GET");

        setAirlines(airlines);
        setDepartureAirport(airports);
        setArrivalAirport(airports);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  console.log(formData);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/flights/${flight.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Updated content type
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData), // Changed from qs.stringify to JSON.stringify
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle success
    } catch (error) {
      console.error("There was an error!", error);
      // Handle error
    }
  };

  console.log(formData);
  const filterAirlines = (inputValue) => {
    return airline.airlines?.filter((i) =>
      i.name.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const filterAirports = (inputValue) => {
    return departureAirport.airport?.filter((i) =>
      i.name.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };
  const loadOptionsAirlines = generateLoadOptions(filterAirlines);
  const loadOptionsAirports = generateLoadOptions(filterAirports);
  const departureDateTime = new Date(
    `${formData.departureDate} ${formData.departureTime}`,
  );
  const arrivalDateTime = new Date(
    `${formData.arrivalDate} ${formData.arrivalTime}`,
  );

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-12">
      <h2 className="font-bold text-lg mb-4">Edit Flight</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-auto">
          <label className="label-text">Flight Code</label>
          <input
            type="text"
            name="flightCode"
            value={formData.flightCode}
            onChange={handleChange}
            className="input input-bordered h-10"
          />
        </div>
        <div className="flex flex-col w-full md:w-64">
          <label htmlFor="airlines" className="label-text">
            Airline
          </label>
          <ReactSelect
            defaultValue={{
              label: formData.airlineName,
              value: formData.airlineId,
            }}
            options={loadOptionsAirlines}
            defaultOptions
            onChange={(selectedValue) =>
              setFormData({ ...formData, airlineId: selectedValue.value })
            }
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-64">
          <label htmlFor="departureAirport" className="label-text">
            Departure Airport
          </label>
          <ReactSelect
            options={loadOptionsAirports}
            defaultValue={{
              label: formData.departureAirportName,
              value: formData.departureAirportId,
            }}
            defaultOptions
            onChange={(selectedValue) =>
              setFormData({
                ...formData,
                departureAirportId: selectedValue.value,
              })
            }
          />
          <div className="">
            <label htmlFor="departureDate" className="label-text">
              Departure Date
            </label>
            <DatePicker
              selected={formData.departureDate}
              onChange={(date) => handleChange(date, "departure")}
              className="input input-bordered h-10"
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div className="">
            <label htmlFor="departureTime" className="label-text">
              Departure Time
            </label>
            <DatePicker
              selected={departureDateTime}
              onChange={(date) => {
                const newTime = moment(date).format("HH:mm:ss");
                setFormData({
                  ...formData,
                  departureTime: newTime,
                });
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeInputLabel="Time:"
              dateFormat="h:mm aa"
              className="input input-bordered h-10"
            />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-64">
          <label htmlFor="arrivalAirport" className="label-text">
            Arrival Airport
          </label>
          <ReactSelect
            options={loadOptionsAirports}
            defaultValue={{
              label: formData.arrivalAirportName,
              value: formData.arrivalAirportId,
            }}
            defaultOptions
            onChange={(selectedValue) =>
              setFormData({
                ...formData,
                arrivalAirportId: selectedValue.value,
              })
            }
          />
          <div className="">
            <label htmlFor="departureTime" className="label-text">
              Arrival Date
            </label>
            <DatePicker
              selected={formData.arrivalDate}
              onChange={(date) => handleChange(date, "arrival")}
              className="input input-bordered h-10"
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div className="">
            <label htmlFor="departureTime" className="label-text">
              Arrival Time
            </label>
            <DatePicker
              selected={arrivalDateTime}
              onChange={(date) => {
                const newTime = moment(date).format("HH:mm:ss");
                setFormData({
                  ...formData,
                  arrivalTime: newTime,
                });
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeInputLabel="Time:"
              dateFormat="h:mm aa"
              className="input input-bordered h-10"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="label-text">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="input input-bordered h-10 w-full max-w-xs"
        />
        <div className="flex align-middle gap-3 py-2">
          <label htmlFor="">Available</label>
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="checkbox"
          />
        </div>
      </div>

      <div className="py-2">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FlightFormUpdate;

const generateLoadOptions = (filterFunction) => {
  return (inputValue, callback) => {
    setTimeout(() => {
      const filteredOptions = filterFunction(inputValue);

      const transformedOptions = filteredOptions?.map((option) => ({
        value: option.id,
        label: option.name,
      }));

      callback(transformedOptions);
    }, 1000);
  };
};
