"use client";
import { useSearchParams } from "next/navigation";
import FlightList from "../Components/Flight/FlightList";
import { useState, useEffect } from "react";

const Flight = () => {
  const searchParams = useSearchParams();
  const dep = searchParams.get("depDate");
  const from = searchParams.get("depAirport");
  const to = searchParams.get("arrAirport");
  const [depFlight, setDepFlight] = useState([]);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Fetch all necessary flight information when the page loads
    const url = `http://localhost:5000/v1/flights/search?depDate=${dep}&depAirport=${from}&arrAirport=${to}`;

    const fetchFlights = async () => {
      try {
        // Fetch outbound flights
        const response = await fetch(
          `http://localhost:5000/v1/flights/search?depDate=${dep}&depAirport=${from}&arrAirport=${to}`,
        );
        const data = await response.json();
        if (data && data.flights) {
          setDepFlight(data.flights);
        }

        // Fetch return flights
        // if (to != null) {
        //   const returnResponse = await fetch("YOUR_RETURN_FLIGHT_API_ENDPOINT");
        //   const returnData = await returnResponse.json();
        //   setReturnFlights(returnData);
        // }
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []); // Run this effect only once when the component mounts
  return (
    <main className="flex min-h-screen flex-col md:px-56 px-12 py-12 ">
      <div className="font-bold text-2xl">Search results</div>
      {`${dep}, ${from}, ${to}`}

      <FlightList flights={depFlight} />
    </main>
  );
};

export default Flight;
