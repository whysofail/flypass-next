'use client'
import { TableVirtuoso } from "react-virtuoso";
import Link from "next/link";

const FlightTable = ({ flights, onEditFlight, onDeleteFlight }) => {
  const renderItem = (index, flight) => {
    console.log("Flight:", flight); // Debugging: Log flight data to console
    if (!flight) return null; // Ensure flight data exists
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
      <>
      <td>{id}</td>
        <td >{Airline?.name}</td> {/* Use optional chaining to handle potential undefined values */}
        <td style={{width: 350}}>{departureAirport?.name}</td>
        <td style={{width: 350}}>{arrivalAirport?.name}</td>
        <td>{departureDate}</td>
        <td>{departureTime} - {arrivalTime}</td>
        <td>{formattedPrice}</td>
        <td style={{width: 400}} className="flex gap-2">
          <Link href={`/dashboard/flight/edit/${id}`} className="btn btn-primary">Edit</Link>
          <button className="btn btn-error" onClick={() => onDeleteFlight(id)}>Delete</button>
        </td>

      </>
    );
  };



  return (
    <div className="w-full"> {/* Ensure the parent container has full width */}
      <div className="table card bg-base-100 w-full border shadow-xl">
        <TableVirtuoso
          style={{ height: 500, width: '100%' }} 
          className=""
          fixedHeaderContent={(index, flight) => (
            <tr className="bg-gray-400">
              <th>No</th>
              <th>Airline</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th style={{ width: 200 }}>Action</th>
            </tr>
          )}
          data={flights}
          itemContent={renderItem}
        />
      </div>
    </div>
  );
  
};

export default FlightTable;
