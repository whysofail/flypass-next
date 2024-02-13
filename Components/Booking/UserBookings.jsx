import React, { useState } from "react";
import moment from "moment";

const BookingCard = ({ booking }) => {
  // Check if booking is undefined or null
  if (!booking) {
    return <div>No booking available</div>;
  }
  console.log(booking);
  // State to toggle passenger details visibility
  const [isPassengerVisible, setIsPassengerVisible] = useState(false);

  // Function to toggle passenger details visibility
  const togglePassengerVisibility = () => {
    setIsPassengerVisible(!isPassengerVisible);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-1/2 flex flex-col flex-wrap border-2">
      <div className="flex flex-row gap-2 grow w-full justify-between">
        <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
        <p className="text-gray-600 font-bold">
          Booking Code: {booking.bookingCode}
        </p>
        <p>{moment(booking.createdAt).format("dddd D, MMMM YYYY")}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Flight Details</h3>
        <p className="font-medium">
          {booking.flight1.departureAirport.name} -{" "}
          {booking.flight1.arrivalAirport.name}
        </p>
        <p className="text-gray-600 mb-2">
          Flight Code: {booking.flight1.flightCode}
        </p>
        <div className="flex justify-between w-full">
          <div>
            <p className="text-gray-600 mb-2">
              Departure Date:{" "}
              {moment(booking.flight1.departureDate).format(
                "dddd D, MMMM YYYY",
              )}
            </p>
            <p className="text-gray-600 mb-2">
              Departure Time:{" "}
              {moment(booking.flight1.departureTime, "HH:mm:ss").format(
                "hh:mm A",
              )}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">
              Arrival Date:{" "}
              {moment(booking.flight1.arrivalDate).format("dddd D, MMMM YYYY")}
            </p>
            <p className="text-gray-600 mb-2">
              Arrival Time:{" "}
              {moment(booking.flight1.arrivalTime, "HH:mm:ss").format(
                "hh:mm A",
              )}
            </p>
          </div>
        </div>

        {/* Render other flight details as needed */}
      </div>
      {/* Render second flight details if flight2id exists */}
      {booking.roundtrip === true && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Return Flight Details</h3>
          <p className="font-medium">
            {booking.flight2.departureAirport.name} -{" "}
            {booking.flight2.arrivalAirport.name}
          </p>
          <p className="text-gray-600 mb-2">
            Flight Code: {booking.flight2.flightCode}
          </p>
          <div className="flex justify-between w-full">
            <div>
              <p className="text-gray-600 mb-2">
                Departure Date:{" "}
                {moment(booking.flight1.departureDate).format(
                  "dddd D, MMMM YYYY",
                )}
              </p>
              <p className="text-gray-600 mb-2">
                Departure Time:{" "}
                {moment(booking.flight1.departureTime, "HH:mm:ss").format(
                  "hh:mm A",
                )}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                Arrival Date:{" "}
                {moment(booking.flight1.arrivalDate).format(
                  "dddd D, MMMM YYYY",
                )}
              </p>
              <p className="text-gray-600 mb-2">
                Arrival Time:{" "}
                {moment(booking.flight1.arrivalTime, "HH:mm:ss").format(
                  "hh:mm A",
                )}
              </p>
            </div>
          </div>
        </div>
      )}
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
              <div className="flex justify-between">
                <div className="flex flex-col w-full">
                  <span className="font-bold text-md">Full name</span>
                  <span>
                    {passenger.firstName}&nbsp;
                    {passenger.lastName}
                  </span>
                </div>
                <div className="flex flex-col w-full">
                  <span className="font-bold text-md">Identity Type</span>
                  <span>{passenger.identityType}</span>
                </div>
                <div className="flex flex-col w-full">
                  <span className="font-bold text-md">Identity Number</span>
                  <span>{passenger.identityNumber}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default BookingCard;
