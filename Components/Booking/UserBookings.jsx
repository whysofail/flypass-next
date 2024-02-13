import React, { useState } from "react";

const BookingCard = ({ booking }) => {
  // Check if booking is undefined or null
  if (!booking) {
    return <div>No booking available</div>;
  }

  // State to toggle passenger details visibility
  const [isPassengerVisible, setIsPassengerVisible] = useState(false);

  // Function to toggle passenger details visibility
  const togglePassengerVisibility = () => {
    setIsPassengerVisible(!isPassengerVisible);
  };

  // Render passenger dropdown options

  // Render booking card
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-1/2 flex flex-col flex-wrap">
      <div className="flex flex-row gap-2 grow w-full justify-between">
        <h2 className="text-lg font-semibold">Booking Details</h2>
        <p className="text-gray-600">Booking Code: {booking.bookingCode}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Flight Details</h3>
        <h2></h2>
        <p className="text-gray-600 mb-2">
          Flight Code: {booking.flight1.flightCode}
        </p>
        <p className="text-gray-600 mb-2">
          Departure Date: {booking.flight1.departureDate}
        </p>
        <p className="text-gray-600 mb-2">
          Departure Time: {booking.flight1.departureTime}
        </p>
        {/* Render other flight details as needed */}
      </div>
      <div className="mb-4">
        <h3
          className="text-lg font-semibold mb-2 cursor-pointer"
          onClick={togglePassengerVisibility}
        >
          Passenger Details
        </h3>
        {!isPassengerVisible
          ? ""
          : booking.Passengers.map((passenger) => (
              <span>
                {passenger.firstName}&nbsp;
                {passenger.lastName}
              </span>
            ))}
      </div>

      {/* Render other sections as needed */}
    </div>
  );
};

export default BookingCard;
