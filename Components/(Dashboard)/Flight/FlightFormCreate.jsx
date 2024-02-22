"use client";
import { useState, useEffect } from "react";
import { fetchData } from "../../../Helper/fetch";
import ReactSelect from "../../Searchbar/ReactSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const FlightFormCreate = ({ authToken }) => {
  const [formData, setFormData] = useState({
    flightCode: "",
    airlineId: "",
    departureAirportId: "",
    arrivalAirportId: "",
    departureDate: new Date(),
    departureTime: "",
    arrivalDate: new Date(),
    arrivalTime: "",
    price: "",
    flightClassId: 1,
    baggage: 30,
    isAvailable: true,
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
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedFormData = {
        ...formData,
        departureDate: moment(formData.departureDate).format("YYYY-MM-DD"),
        arrivalDate: moment(formData.arrivalDate).format("YYYY-MM-DD"),
        departureTime: moment(formData.departureTime).format("HH:mm"),
        arrivalTime: moment(formData.arrivalTime).format("HH:mm"),
      };

      const response = await fetch(`${baseURL}/flights`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formattedFormData),
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
  console.log(formData);
  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-12">
      <h2 className="font-bold text-lg mb-4">Create Flight</h2>
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
              onChange={(date) =>
                setFormData({ ...formData, departureDate: date })
              }
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
              selected={formData.departureTime}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  departureTime: date,
                })
              }
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
            defaultOptions
            onChange={(selectedValue) =>
              setFormData({
                ...formData,
                arrivalAirportId: selectedValue.value,
              })
            }
          />
          <div className="">
            <label htmlFor="arrivalTime" className="label-text">
              Arrival Date
            </label>
            <DatePicker
              selected={formData.arrivalDate}
              onChange={(date) =>
                setFormData({ ...formData, arrivalDate: date })
              }
              className="input input-bordered h-10"
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div className="">
            <label htmlFor="arrivalTime" className="label-text">
              Arrival Time
            </label>
            <DatePicker
              selected={formData.arrivalTime}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  arrivalTime: date,
                })
              }
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

export default FlightFormCreate;

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
