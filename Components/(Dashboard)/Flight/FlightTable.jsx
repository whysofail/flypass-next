"use client";
import { TableVirtuoso } from "react-virtuoso";
import FlightDeleteButton from "./FlightDeleteButton";
import Link from "next/link";

const FlightTable = ({ flights, authToken }) => {
  const renderItem = (index, flight) => {
    if (!flight) return null;
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
        <td>{Airline?.name}</td>
        <td style={{ width: 350 }}>{departureAirport?.name}</td>
        <td style={{ width: 350 }}>{arrivalAirport?.name}</td>
        <td style={{ width: 200 }}>{departureDate}</td>
        <td>
          {departureTime} - {arrivalTime}
        </td>
        <td>{formattedPrice}</td>
        <td style={{ width: 250 }} className="flex gap-2">
          <Link href={`/dashboard/flight/${id}`} className="btn ">
            Detail
          </Link>
          <Link
            href={`/dashboard/flight/edit/${id}`}
            className="btn btn-primary"
          >
            Edit
          </Link>
          <FlightDeleteButton />
        </td>
      </>
    );
  };

  return (
    <div className="w-full">
      <div className="table table-zebra card bg-base-100 w-full border shadow-xl">
        <TableVirtuoso
          style={{ height: 500, width: "100%" }}
          className=""
          fixedHeaderContent={(index, flight) => (
            <tr className="bg-gray-400">
              <th>Id</th>
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
