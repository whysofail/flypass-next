"use client";
import React, { useState } from "react";
import PassengerForm from "./PassengerForm";

const BookingForm = ({ onBookFlight, onPassengerUpdate, children }) => {
  const [contactInfo, setContactInfo] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [passengers, setPassengers] = useState([]);

  const handleContactChange = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassengerUpdate = (updatedPassengers) => {
    // Update passengers in the parent component
    onPassengerUpdate(updatedPassengers);
  };
  console.log(passengers)
  const handleBookFlight = () => {
    // Check if necessary data is present before booking
    if (contactInfo.title && contactInfo.firstName && contactInfo.lastName) {
      onBookFlight(contactInfo, passengers);
    } else {
      // Handle validation or show an error message
      console.error("Incomplete data. Cannot book the flight.");
      console.log(contactInfo, passengers);
    }
  };

  return (
    <div className="flex gap-2">
      <div className="card w-full bg-base-100 border border-slate-300 shadow-xl p-10 ">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Fill in your details</h2>

          <form>
            <label className="label">Title:</label>
            <select
              className="select select-bordered w-full max-w-xs"
              id="title"
              name="title"
              value={contactInfo.title}
              onChange={handleContactChange}
            >
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
            </select>

            <label className="label">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={contactInfo.firstName}
              onChange={handleContactChange}
              className="input input-bordered w-full max-w-xs"
            />

            <label className="label">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={contactInfo.lastName}
              onChange={handleContactChange}
              className="input input-bordered w-full max-w-xs"
            />

            <label className="label">Phone:</label>
            <input
              type="text"
              name="phone"
              value={contactInfo.phone}
              onChange={handleContactChange}
              className="input input-bordered w-full max-w-xs"
            />

            <label className="label">Email:</label>
            <input
              type="text"
              name="email"
              value={contactInfo.email}
              onChange={handleContactChange}
              className="input input-bordered w-full max-w-xs"
            />
          </form>
        </div>
        <PassengerForm
          passengers={passengers}
          onPassengerUpdate={setPassengers}
        />
        <button onClick={handleBookFlight} className="btn btn-primary">
          Book Flight
        </button>
      </div>

      <div className="flex w-full gap-3">{children}</div>
    </div>
  );
};

export default BookingForm;
